import { IData_Tree } from './../View_As_Root/View_As_Root_Handler';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Cramer_Quadratic } from '../../../../common/Cramer/Cramer';
import { Vector_ } from '../../../../common/Vector/Vector_';
import { Matrix_ } from '../../../../common/Matrix/Matrix_';


//manage such as you can easely choose rotation matrix
export class Rotate_On_Target
{
   private readonly __positions : IRotate_Positions_On_Target;
   private readonly __step : IStep;

    constructor (data : IData_Tree[], zoom_handler : IZoom_Handler)
    {
        const delta_origine : Vector<3> = data[0].element.positions.abs_ratio._[0].__.copy();

        const data_positions : IRotate_Position_Data[] = this.__get_rotation_data(data);

        const x = -delta_origine._[0] + 249;        

        const axe_rotation = Vector_.new([x, 0, 0]);
                
        const max_angle = 90;
        
        const center_rotation = Vector_.new([250, 250, x]);

        const phase = 3 * Math.PI / 2;

        const delta_level = 50;

        const direction = 1;

        this.__positions = new Rotate_Positions_On_Target(data_positions, center_rotation, phase, axe_rotation, direction, max_angle, delta_level, zoom_handler);

        this.__step = new Step(max_angle);
    }
    
    public async zoom_and_rotate() : Promise<void>
    {        
        this.__step.init();

        this.__positions.set_phase();

        this.__positions.init_axe_rotation();

        while(1)
        {
            if ( this.__step.complete() ) break;

            this.__positions.zoom_by_step();
            
            this.__positions.rotate_by_step();

            this.__step.next_step();

            await new Promise(r => setTimeout(r, 10));
        }
    }

    private __get_rotation_data(data : IData_Tree[]) : IRotate_Position_Data[]
    {
        const result : IRotate_Position_Data[] = [];

        data.forEach(data =>
        {
            const abs_ratio : Matrix<any> = data.element.positions.abs_ratio;
            result.push(new Rotate_Position_Data(abs_ratio));
        });

        return result;
    }
}

interface IRotate_Positions_On_Target
{
    rotate_by_step(): void;
    zoom_by_step(): void;
    init_axe_rotation(): void;
    set_phase() : void;

}

class Rotate_Positions_On_Target implements IRotate_Positions_On_Target
{
    private readonly __zoom : IZoom_By_Step;
    private readonly __rotate : IRotate_By_Step;
    private readonly __init : IInit_The_Target;

    constructor(
        positions: IRotate_Position_Data[], 
        center_point : Vector<2>, 
        phase : number, 
        axe_rotation : Vector<2>,
        direction : number, 
        max_angle : number, 
        delta_level : number, 
        zoom_handler : IZoom_Handler) 
    {
        this.__init = new Init_The_Target_With_Rotation_Y(positions, axe_rotation);
        this.__zoom = new Zoom_quadratic_By_Step(delta_level, max_angle, zoom_handler);
        this.__rotate = new Rotate_Y_By_Step(positions, phase, direction, center_point);
    }

    public rotate_by_step(): void 
    {
        this.__rotate.rotate_by_step();
    }

    public zoom_by_step(): void 
    {
        this.__zoom.zoom_by_step();
    }

    public init_axe_rotation(): void 
    {
        this.__init.translate_the_target();
    }

    public set_phase(): void 
    {
        this.__rotate.set_phase();
    }
}

interface IInit_The_Target
{
    translate_the_target(): void;
}

class Init_The_Target_With_Rotation_Y implements IInit_The_Target
{   
    constructor(private readonly __positions : IRotate_Position_Data[], private readonly __axe_rotation : Vector<2>) { }

    public translate_the_target(): void 
    {
        this.__positions.forEach(position => position.init_axe_rotation(this.__axe_rotation))
    }
}

interface IStep
{
    next_step(): void;
    complete(): boolean;
    init(): void;
}

class Step implements IStep
{
    private readonly __max_step : number;
    private __current_step = 0;

    constructor(nb_step : number)
    {
        this.__max_step = nb_step;
    }

    public next_step(): void 
    {
        this.__current_step++;
    }

    public complete(): boolean 
    {        
       return this.__current_step >= this.__max_step ? true : false; 
    }

    public init(): void 
    {
        this.__current_step = 0;
    }
}

interface IZoom_By_Step
{
    zoom_by_step(): void;
}

interface IRotate_By_Step
{
    rotate_by_step(): void;
    set_phase() : void;
}

class Zoom_quadratic_By_Step implements IZoom_By_Step
{
    private readonly __handler: IZoom_Handler;
    private readonly __coeff_quad_eq: Vector<3>;
    private __current_x = 0;
    private __previous_y: number = 0;
    private __current_level: number = 0;

    constructor(delta_zoom_level: number, max_angle: number, zoom_handler: IZoom_Handler) 
    {
        this.__handler = zoom_handler;

        const x0 = max_angle;
        const y0 = delta_zoom_level;
        this.__current_level = zoom_handler.get_current_level();

        const p1 = new Vector([0, this.__current_level]);
        const p2 = new Vector([x0 / 2, y0 / 2]);
        const p3 = new Vector([x0, y0]);


        this.__coeff_quad_eq = new Cramer_Quadratic(p1, p2, p3).get_coefficients();
    }

    public zoom_by_step(): void 
    {
        this.__current_x += 1;

        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2];
        const x = this.__current_x;

        const current_y = a * (x * x) + b * x + c;

        const delta = current_y - this.__previous_y;

        this.__current_level += delta;

        this.__handler.zoom_current_flow_by_level(this.__current_level);

        this.__previous_y = current_y;
    }
}

//add rate??
class Rotate_Y_By_Step implements IRotate_By_Step
{
    constructor(
        private readonly __positions : IRotate_Position_Data[],
        private readonly __phase : number,
        private readonly __direction : number,
        private readonly __center_point : Vector<2>,
    ) { }       

    public rotate_by_step(): void 
    {
        const radian = Math.PI/180 * this.__direction;

        const rotation_matrix = Matrix_.rotation_y(radian);
        
        this.__positions.forEach(position => position.rotate_position_on_a_certain_point(rotation_matrix, this.__center_point));
    }

    public set_phase() : void
    {
        const phase = this.__phase * this.__direction;

        const rotation_matrix = Matrix_.rotation_y(phase);
        
        this.__positions.forEach(position => position.rotate_position_on_a_certain_point(rotation_matrix, this.__center_point));
        //this.__positions.forEach(position => position.init_axe_rotation(Vector_.new([100,0])));

    }
}

interface IRotate_Position_Data
{
    init_axe_rotation(axe_rotation : Vector<2>) : void;
    rotate_position_on_a_certain_point(matrix_rotation : Matrix<4>, center_rotation : Vector<3>) : void;
}

class Rotate_Position_Data implements IRotate_Position_Data
{
    private readonly __abs_ratio: Matrix<any>;

    constructor(abs_ratio : Matrix<any>) 
    {
        this.__abs_ratio = abs_ratio;
    }

    public init_axe_rotation(axe_rotation : Vector<2>): void 
    {
        this.__abs_ratio.__.add_by_vector(axe_rotation);
    }

    public rotate_position_on_a_certain_point(matrix_rotation : Matrix<3>, center: Vector<3>): void 
    {
        const copy = this.__abs_ratio.__.copy().__.substract_by_vector(center);

        this.__abs_ratio.__.assign_new_data(copy.__.multiply_by_matrix_new(matrix_rotation).__.add_by_vector_new(center));
    }
}

