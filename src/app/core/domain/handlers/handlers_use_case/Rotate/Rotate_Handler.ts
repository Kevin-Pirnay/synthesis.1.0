import { Cramer_Quadratic } from './../../../../common/Cramer/Cramer';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IMove_View_Handler } from "../Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Vector_ } from '../../../../common/Vector/Vector_';


interface IRotate_On_Target_Data
{
    init_axe_rotation(axe_rotation : Vector) : void;
    rotate_position_on_a_certain_point(radian : number, center_rotation : Vector) : void;
}

class Rotate_On_Target_Data implements IRotate_On_Target_Data
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

    public rotate_position_on_a_certain_point(radian: number, position: Vector): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fix_data.__.rotate_z_new(radian).__.add_by_vector(position));
    }
}

export interface IZoom_On_Target
{
    zoom() : void;
}


export class Zoom_On_Target implements IZoom_On_Target
{
    private readonly __move : IMove_By_Step;
    private readonly __zoom : IZoom_By_Step;
    private readonly __step : IStep;
    
    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted : Vector,
        ratio : number,
        zoom_handler: IZoom_Handler,
        move_view_handler: IMove_View_Handler
    ) {
        const pre_process = new Pre_process(abs_ratio_target, coordinates_wanted, ratio, zoom_handler.get_current_zoom_fator(),zoom_handler.get_current_level(), zoom_handler.get_alpha()).result;

        this.__move = new Move_Quadratic_By_Step(pre_process.x_y_normalize, pre_process.distance, pre_process.max_factor, move_view_handler);
        this.__zoom = new Zoom_quadratic_By_Step(pre_process.delta_zoom_level, pre_process.distance, zoom_handler);
        this.__step = new Step(pre_process.distance);
    }

    public async zoom() : Promise<void>
    {
        this.__step.init();

        while(1)
        {
            this.__move.move_by_step();

            this.__zoom.zoom_by_step();

            this.__step.next_step();

            if(this.__step.complete()) break;

            await new Promise(r => setTimeout(r, 1));
        }
    }
}

class Pre_Process_Result
{
    constructor(
        public readonly delta_zoom_level : number,
        public readonly x_y_normalize : Vector,
        public readonly distance : number,
        public readonly max_factor : number
    ) { }
}

class Pre_process
{
    public readonly result : Pre_Process_Result;

    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted : Vector,
        ratio : number,
        current_factor : number,
        current_zoom_level : number,
        alpha : number
    ) 
    {        
        this.result = this.__pre_process(abs_ratio_target, coordinates_wanted, ratio, current_factor, current_zoom_level, alpha);
    }

    private __pre_process(abs_ratio_target: Matrix<4>, coordinates_wanted : Vector, ratio : number, current_factor : number, current_zoom_level : number, alpha : number) : Pre_Process_Result
    {
        const C_M_Z_F_A_L = new Compute_Max_Zoom_Factor_And_Level(abs_ratio_target, ratio, current_factor, current_zoom_level, alpha);                

        const C_D_S = new Compute_Distance(abs_ratio_target, coordinates_wanted, C_M_Z_F_A_L.max_factor);

        return new Pre_Process_Result(C_M_Z_F_A_L.delta_level, C_D_S.x_y_normalize, C_D_S.distance, C_M_Z_F_A_L.max_factor);
    }
}

interface IMove_By_Step
{
    move_by_step(): unknown;

}

interface IZoom_By_Step
{
    zoom_by_step(): unknown;

}

interface IStep
{
    init() : void;
    next_step() : void;
    complete() : boolean;
}

class Zoom_quadratic_By_Step implements IZoom_By_Step
{
    private readonly __handler : IZoom_Handler;
    private readonly __coeff_quad_eq : Vector;
    private __current_x = 0;
    private __previous_y : number = 0;
    private __current_level : number = 0;

    constructor(delta_zoom_level : number, distance : number, zoom_handler : IZoom_Handler) 
    { 
        this.__handler = zoom_handler;

        const x0 = distance;
        const y0 = delta_zoom_level;
        this.__current_level = zoom_handler.get_current_level();

        console.log(this.__current_level, delta_zoom_level, distance);        
        
        
        const p1 = new Vector([0,this.__current_level]);
        const p2 = new Vector([x0/2, y0/2]);
        const p3 = new Vector([x0,y0]);


        this.__coeff_quad_eq = new Cramer_Quadratic(p1,p2,p3).get_coefficients();
    }

    public zoom_by_step(): void 
    {
        this.__current_x += 1;

        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2]
        const x = this.__current_x;

        const current_y = a * (x*x) + b * x + c;

        const delta = current_y - this.__previous_y;

        this.__current_level += delta;        

        this.__handler.zoom_current_flow_by_level(this.__current_level); 

        this.__previous_y = current_y;      
    }
}

class Move_Quadratic_By_Step implements IMove_By_Step
{
    private readonly __handler : IMove_View_Handler;
    private readonly __coeff_quad_eq : Vector;
    private readonly __step_x : number;
    private __current_x : number = 0;
    private __previous_y : number = 0;

    constructor(x_y_normalize : Vector, distance : number, move_handler : IMove_View_Handler, zoom_handler : IZoom_Handler) 
    {         
        this.__handler = move_handler;

        this.__step_x = (x_y_normalize._[0] / distance) * max_factor;        

        const x = x_y_normalize._[0] //* max_factor;
        const y = x_y_normalize._[1] //* max_factor;

        const p1 = new Vector([0,0]);
        const p2 = new Vector([x/2, (1/y)]);
        const p3 = new Vector([x,y]);        

        this.__coeff_quad_eq = new Cramer_Quadratic(p1,p2,p3).get_coefficients();
    }

    public move_by_step(): void 
    {
        this.__current_x += this.__step_x;

        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2];
        const x = this.__current_x;

        const current_y = a * (x*x) + b * x + c;

        const delta = current_y - this.__previous_y;

        const delta_vec = Vector_.new([-this.__step_x, -delta]);

        this.__handler.move_view_by_delta(delta_vec);

        this.__previous_y = current_y;
    }
}

class Step implements IStep
{
    private readonly __max_step : number;
    private __current_step : number = 0;

    constructor(nb_step : number)
    {
        this.__max_step = nb_step;
    }

    public init() : void
    {
        this.__current_step = 0;
    }

    public next_step() : void
    {
        this.__current_step++;
    }

    public complete() : boolean
    {
        return this.__current_step > this.__max_step ? true : false;
    }
}

class Compute_Distance
{
    public readonly distance : number;
    public readonly x_y_normalize : Vector;

    constructor(abs_ratio_target: Matrix<4>, coordinates_wanted : Vector, max_factor_zoom : number) 
    {
        const center_target : Vector = this.__compute_center_point(abs_ratio_target);

        //const dist : number = this.__compute_distance(center_target, coordinates_wanted);
        const dist : number = this.__compute_distance(abs_ratio_target._[0], coordinates_wanted);

        this.distance = dist //* max_factor_zoom;

        //this.x_y_normalize = this.__compute_x_y_normalize(center_target, coordinates_wanted);
        this.x_y_normalize = this.__compute_x_y_normalize(abs_ratio_target._[0], coordinates_wanted);        
    }
    
    private __compute_distance(a: Vector, b: Vector) : number
    {
        const x2 = (a._[0] - b._[0]) ** 2;
        const y2 = (a._[1] - b._[1]) ** 2;

        const distance =  Math.sqrt(x2 + y2);        

        return distance;
    }

    private __compute_center_point(matrix : Matrix<4>) : Vector
    {
        const x = (matrix._[0]._[0] + matrix._[1]._[0]) * 1 / 2;
        const y = (matrix._[0]._[1] + matrix._[3]._[1]) * 1 / 2;

        return Vector_.new([x, y]);
    }

    private __compute_x_y_normalize(a: Vector, b: Vector) : Vector
    {
        const x = a._[0] - b._[0];
        const y = a._[1] - b._[1];

        const result = Vector_.new([x,y]);

        return result;
    }
}

class Compute_Max_Zoom_Factor_And_Level
{
    public readonly max_factor : number;
    public readonly delta_level : number;

    constructor(abs_ratio_target: Matrix<4>, ratio_x : number, current_factor : number, current_level : number, alpha : number) 
    {
        const width_target = this.__compute_x_width_target(abs_ratio_target);

        this.max_factor = this.__compute_max_zoom_factor(ratio_x, width_target);

        const max_level = Math.log(this.max_factor) / Math.log(current_factor + 0.01);

        this.delta_level = max_level - current_level;
    }

    private __compute_max_zoom_factor(x_with_wanted : number, x_width_target : number) : number
    {
        const factor = x_with_wanted / x_width_target;        

        return factor;
    }

    private __compute_x_width_target(abs_ratio: Matrix<4>) : number
    {
        return abs_ratio._[1]._[0] - abs_ratio._[0]._[0];
    }
}