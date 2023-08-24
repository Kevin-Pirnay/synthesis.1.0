import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Cramer_Quadratic } from '../../../../common/Cramer/Cramer';
import { Matrix_ } from '../../../../common/Matrix/Matrix_';
import { IData_Tree } from "../View_As_Root/IData_Tree";
import { IRotate_On_Taget } from "./IRotate_On_Taget";
import { Zoom_And_Rotate_Inputs } from "./Zoom_And_Rotate_Inputs";


export class Rotate_On_Target implements IRotate_On_Taget
{
   private readonly __positions : IRotate_Positions_On_Target;
   private readonly __step : IStep;

    constructor (inputs: Zoom_And_Rotate_Inputs)
    {   
        const data_positions : IRotate_Position_Data[] = this.__get_rotation_data(inputs.data);

        this.__positions = new Rotate_Positions_On_Target(data_positions, inputs.center_rotation, inputs.phase, inputs.axe_rotation, inputs.direction, inputs.max_angle, inputs.delta_level, inputs.zoom_handler);

        this.__step = new Step(inputs.max_angle);
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

        data.forEach((data : IData_Tree) =>
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


        this.__coeff_quad_eq = new Cramer_Quadratic(p1, p2, p3).coefficients;
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

