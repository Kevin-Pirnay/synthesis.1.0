import { IData_Tree } from './../View_As_Root/View_As_Root_Handler';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Cramer_Quadratic } from '../../../../common/Cramer/Cramer';
import { Vector_ } from '../../../../common/Vector/Vector_';


//manage such as you can easaly choose rotation
class Rotate_On_Target
{
   private readonly __positions : IRotate_Positions_On_Target;
   private readonly __step : IStep;

    constructor (data : IData_Tree[], max_angle : string, rotation_matrix : Matrix<4>, zoom_handler : IZoom_Handler)
    {

    }
    
    public zoom_and_rotate() : void
    {
        this.__step.init();

        this.__positions.init_axe_rotation();

        this.__positions.init_rotation_on_itself();

        while(1)
        {
            this.__positions.zoom_by_step();

            this.__positions.rotate_by_step();

            if ( this.__step.complete() ) break;

            this.__step.next_step();
        }
    }
}

interface IRotate_Positions_On_Target
{
    rotate_by_step(): void;
    zoom_by_step(): void;
    init_rotation_on_itself(): void;
    init_axe_rotation(): void;

}

class Rotate_Positions_On_Target implements IRotate_Positions_On_Target
{
    private readonly __zoom : IZoom_By_Step;
    private readonly __rotate : IRotate_By_Step;
    private readonly __init : IInit_The_Target;

    constructor() 
    {
        
    }

    public rotate_by_step(): void 
    {
        this.__rotate.rotate_by_step();
    }

    public zoom_by_step(): void 
    {
        this.__zoom.zoom_by_step();
    }

    public init_rotation_on_itself(): void 
    {
        this.__init.rotate_the_target_on_itself();
    }

    public init_axe_rotation(): void 
    {
        this.__init.translate_the_target();
    }
}

interface IInit_The_Target
{
    translate_the_target(): void;
    rotate_the_target_on_itself(): void;

}

class Init_The_Target implements IInit_The_Target
{   
    constructor(private readonly __positions : IRotate_Position_Data[], private readonly __axe_rotation : Vector, private readonly __matrix_rotation : Matrix<3>) { }

    public translate_the_target(): void 
    {
        this.__positions.forEach(position => position.init_axe_rotation(this.__axe_rotation))
    }

    public rotate_the_target_on_itself(): void 
    {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;

        this.__positions.forEach(position => position.rotate_on_itself(Vector_.new([x,y]) ,this.__matrix_rotation));
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
       return this.__current_step > this.__max_step ? true : false; 
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

}

class Zoom_quadratic_By_Step implements IZoom_By_Step
{
    private readonly __handler: IZoom_Handler;
    private readonly __coeff_quad_eq: Vector;
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

class Rotate_By_Step implements IRotate_By_Step
{
    private readonly __positions : IRotate_Position_Data[]

    public rotate_by_step(): void 
    {
        throw new Error("Method not implemented.");
    }
}

interface IRotate_Position_Data
{
    init_axe_rotation(axe_rotation : Vector) : void;
    rotate_position_on_a_certain_point(matrix_rotation : Matrix<4>, center_rotation : Vector) : void;
    rotate_on_itself(origin_point : Vector, matrix_rotation : Matrix<3>) : void
}

class Rotate_Position_Data implements IRotate_Position_Data
{
    private readonly __abs_ratio: Matrix<any>;
    private readonly __fix_data: Matrix<any>;

    constructor(abs_ratio : Matrix<any>) 
    {
        this.__abs_ratio = abs_ratio;
        this.__fix_data = this.__abs_ratio.__.copy();
    }

    public init_axe_rotation(axe_rotation : Vector): void 
    {
        this.__fix_data.__.add_by_vector(axe_rotation);
        this.__abs_ratio.__.add_by_vector(axe_rotation);
    }

    public rotate_position_on_a_certain_point(matrix_rotation : Matrix<3>, position: Vector): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fix_data.__.multiply_by_matrix_new(matrix_rotation).__.add_by_vector(position));
    }

    public rotate_on_itself(origin_point : Vector, matrix_rotation : Matrix<3>) : void
    {
        this.__fix_data.__.substract_by_vector(origin_point);
        this.__abs_ratio.__.substract_by_vector(origin_point);

        this.__abs_ratio.__.multiply_by_matrix(matrix_rotation);
        this.__fix_data.__.multiply_by_matrix(matrix_rotation);

        this.__abs_ratio.__.add_by_vector(origin_point);
        this.__fix_data.__.add_by_vector(origin_point);
    }
}

