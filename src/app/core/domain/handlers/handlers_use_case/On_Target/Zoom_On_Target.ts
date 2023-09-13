import { Quad_Callback } from '../../../../../adapters/driven/dao/Dao_Anim';
import { Cramer_Quadratic } from '../../../../common/Cramer/Cramer';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { IMove_View_Handler } from "../Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { IZoom_On_Target } from './IZoom_On_Target';


export class Zoom_On_Target implements IZoom_On_Target 
{
    private readonly __move: IMove_By_Step;
    private readonly __zoom: IZoom_By_Step;
    private readonly __step: IStep;

    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted: Vector<3>,
        ratio: number,
        zoom_center_point : Vector<3>,
        move_quad : Quad_Callback,
        zoom_quad : Quad_Callback,
        zoom_handler: IZoom_Handler,
        move_view_handler: IMove_View_Handler
    ) {
        const pre_process = new Pre_process(abs_ratio_target, coordinates_wanted, ratio, zoom_handler.get_current_zoom_fator(), zoom_handler.get_alpha()).result;

        this.__move = new Move_Quadratic_By_Step(pre_process.x_y_normalize, pre_process.distance, move_view_handler, zoom_handler, move_quad);
        this.__zoom = new Zoom_quadratic_By_Step(pre_process.delta_zoom_level, pre_process.distance, zoom_center_point, zoom_handler, zoom_quad);
        this.__step = new Step(pre_process.distance);        
    }

    public async move_and_zoom(): Promise<void> 
    {
        this.__step.init();

        while (1) 
        {
            if (this.__step.completed()) break;

            this.__move.move_by_step();

            this.__zoom.zoom_by_step();

            this.__step.next_step();

            await new Promise(r => setTimeout(r, 1));
        }
    }
}

export class Pre_Process_Result 
{
    constructor(
        public readonly delta_zoom_level: number,
        public readonly x_y_normalize: Vector<2>,
        public readonly distance: number
    ) { }
}

export class Pre_process 
{
    public readonly result: Pre_Process_Result;

    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted: Vector<3>,
        ratio: number,
        current_factor: number,
        alpha: number
    ) {
        this.result = this.__pre_process(abs_ratio_target, coordinates_wanted, ratio, current_factor, alpha);
    }

    private __pre_process(abs_ratio_target: Matrix<4>, coordinates_wanted: Vector<2>, ratio: number, current_factor: number, alpha: number): Pre_Process_Result 
    {
        const C_M_Z_F_A_L = new Compute_Max_Zoom_Factor_And_Level(abs_ratio_target, ratio, current_factor, alpha);

        const C_D_S = new Compute_Distance(abs_ratio_target, coordinates_wanted);

        return new Pre_Process_Result(C_M_Z_F_A_L.delta_level, C_D_S.x_y_normalize, C_D_S.distance);
    }
}

export interface IMove_By_Step 
{
    move_by_step(): void;

}
export interface IZoom_By_Step 
{
    zoom_by_step(): void;
}
export interface IStep 
{
    init(): void;
    next_step(): void;
    completed(): boolean;
}

export class Zoom_quadratic_By_Step implements IZoom_By_Step 
{
    private readonly __handler: IZoom_Handler;
    private readonly __zoom_center_point : Vector<3>
    private __current_level: number = 0;
    private readonly __zoom : IZoom_by_Step_;

    constructor(delta_zoom_level: number, distance: number, zoom_center_point : Vector<3>, zoom_handler: IZoom_Handler, zoom_quad : Quad_Callback) 
    {
        this.__handler = zoom_handler;

        this.__zoom_center_point = zoom_center_point;

        this.__current_level = zoom_handler.get_current_level();

        const points : Vector<2>[] = this.__get_caracteristics_shape_function_points(distance, delta_zoom_level, this.__current_level, zoom_quad);

        this.__zoom = Zoom_by_Step_.get_zoom_injector(points[0],points[1],points[2]);
    }

    private __get_caracteristics_shape_function_points(distance : number, delta_zoom_level : number, current_level : number, zoom_quad : Quad_Callback) : Vector<2>[]
    {
        const p1 = new Vector([0, current_level]);
        const p2 = zoom_quad(distance,delta_zoom_level);
        const p3 = new Vector([distance, delta_zoom_level]);

        return [p1,p2,p3];
    }

    public zoom_by_step(): void 
    {
        this.__zoom.increment_the_x_of_this_step_by(1);

       const current_y : number = this.__zoom.compute_the_current_y_of_this_step();

       const delta : number = this.__zoom.compute_the_delta_between_this_step_and_the_previous_step(current_y);

        this.__current_level += delta;

        this.__handler.zoom_current_flow_by_level_toward_this_point(this.__current_level, this.__zoom_center_point);

        this.__zoom.update_the_previous_step_to_be_equal_to_the_current_step(current_y);
    }
}

interface IZoom_by_Step_
{
    increment_the_x_of_this_step_by(value : number) : void;
    compute_the_current_y_of_this_step() : number;
    compute_the_delta_between_this_step_and_the_previous_step(current_y : number) : number;
    update_the_previous_step_to_be_equal_to_the_current_step(current_y : number) : void;
}

class Zoom_by_Step_ implements IZoom_by_Step_
{
    private readonly __coeff_quad_eq: Vector<3>;
    private __current_x = 0;
    private __previous_y: number = 0;

    constructor(a: Vector<2>, b : Vector<2>, c : Vector<2>)
    {
        this.__coeff_quad_eq = new Cramer_Quadratic(a, b, c).coefficients;
    }

    public increment_the_x_of_this_step_by(value: number): void 
    {
        this.__current_x += value;
    }

    public compute_the_current_y_of_this_step(): number 
    {
        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2];
        const x = this.__current_x;

        const current_y = a * (x * x) + b * x + c;

        return current_y;
    }

    public compute_the_delta_between_this_step_and_the_previous_step(current_y : number): number 
    {
        const delta = current_y - this.__previous_y;

        return delta;
    }

    public update_the_previous_step_to_be_equal_to_the_current_step(current_y : number): void 
    {
        this.__previous_y = current_y;
    }

    public static get_zoom_injector(a: Vector<2>, b : Vector<2>, c : Vector<2>) : IZoom_by_Step_
    {
        return new Zoom_by_Step_(a,b,c);
    }
}

export class Move_Quadratic_By_Step implements IMove_By_Step 
{
    private readonly __handler: IMove_View_Handler;
    private readonly __zoom_handler: IZoom_Handler;
    private readonly __step_x: number;
    private readonly __move : IMove_By_Step_;

    constructor(x_y_normalize: Vector<2>, distance: number, move_handler: IMove_View_Handler, zoom_handler: IZoom_Handler, move_quad : Quad_Callback) 
    {
        this.__handler = move_handler;

        this.__zoom_handler = zoom_handler;

        if(distance == 0) distance = 1;

        this.__step_x = x_y_normalize._[0] / distance;

        const points : Vector<2>[] = this.__get_caracteristics_shape_function_points(x_y_normalize, move_quad);

        this.__move = Move_By_Step_.get_move_injector(points[0], points[1], points[2]);
    }

    private __get_caracteristics_shape_function_points(x_y_normalize: Vector<2>, move_quad : Quad_Callback) : Vector<2>[]
    {
        const x = x_y_normalize._[0];
        const y = x_y_normalize._[1] !== 0 ? x_y_normalize._[1] : 1;

        const p1 = new Vector([0, 0]);
        const p2 = move_quad(x,y);
        const p3 = new Vector([x, y]);

        return [p1,p2,p3];
    }

    public move_by_step(): void 
    {
        const current_factor = this.__zoom_handler.get_current_zoom_fator();

        this.__move.increment_current_x_by(this.__step_x);

        const current_y : number = this.__move.compute_the_current_y_of_this_step();

        const delta : number = this.__move.compute_the_delta_between_this_step_and_the_previous_step(current_y);

        const delta_vec = Vector_.new([-this.__step_x * current_factor, -delta * current_factor, 0]);

        this.__handler.move_view_by_delta(delta_vec);

        this.__move.update_the_previous_step_to_be_equal_to_the_current_step(current_y);
    }
}

interface IMove_By_Step_
{
    increment_current_x_by(value : number) : void;
    compute_the_current_y_of_this_step() : number;
    compute_the_delta_between_this_step_and_the_previous_step(current_y : number) : number;
    update_the_previous_step_to_be_equal_to_the_current_step(current_y : number) : void;
}

class Move_By_Step_ implements IMove_By_Step_
{
    private readonly __coeff_quad_eq: Vector<3>;
    private __current_x = 0;
    private __previous_y: number = 0;

    constructor(a: Vector<2>, b : Vector<2>, c : Vector<2>)
    {
        this.__coeff_quad_eq = new Cramer_Quadratic(a, b, c).coefficients;
    }

    public increment_current_x_by(value : number): void 
    {
        this.__current_x += value;
    }

    public compute_the_current_y_of_this_step(): number 
    {
        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2];
        const x = this.__current_x;

        const current_y = (a * (x * x) + b * x + c);

        return current_y;
    }

    public compute_the_delta_between_this_step_and_the_previous_step(current_y: number): number 
    {
        const delta = current_y - this.__previous_y;

        return delta;
    }

    public update_the_previous_step_to_be_equal_to_the_current_step(current_y: number): void 
    {
        this.__previous_y = current_y;
    }

    public static get_move_injector(a: Vector<2>, b : Vector<2>, c : Vector<2>) : IMove_By_Step_
    {
        return new Move_By_Step_(a,b,c);
    } 
}

export class Step implements IStep 
{
    private readonly __max_step: number;
    private __current_step: number = 0;

    constructor(nb_step: number) 
    {
        this.__max_step = nb_step;
    }

    public init(): void 
    {
        this.__current_step = 0;
    }

    public next_step(): void 
    {
        this.__current_step++;
    }

    public completed(): boolean 
    {
        return this.__current_step >= this.__max_step ? true : false;
    }
}

export class Compute_Distance 
{
    public readonly distance: number;
    public readonly x_y_normalize: Vector<2>;

    constructor(abs_ratio_target: Matrix<4>, coordinates_wanted: Vector<2>) 
    {
        const center_target: Vector<2> = this.__compute_center_point(abs_ratio_target);

        //const dist : number = this.__compute_distance(center_target, coordinates_wanted);
        this.distance = this.__compute_distance(abs_ratio_target._[0], coordinates_wanted);

        //this.x_y_normalize = this.__compute_x_y_normalize(center_target, coordinates_wanted);
        this.x_y_normalize = this.__compute_x_y_normalize(abs_ratio_target._[0], coordinates_wanted);
    }

    private __compute_distance(a: Vector<2>, b: Vector<2>): number 
    {
        const x2 = (a._[0] - b._[0]) ** 2;
        const y2 = (a._[1] - b._[1]) ** 2;

        const distance = Math.sqrt(x2 + y2);

        return distance;
    }

    private __compute_center_point(matrix: Matrix<4>): Vector<2> 
    {
        const x = (matrix._[0]._[0] + matrix._[1]._[0]) * 1 / 2;
        const y = (matrix._[0]._[1] + matrix._[3]._[1]) * 1 / 2;

        return Vector_.new([x, y]);
    }

    private __compute_x_y_normalize(a: Vector<2>, b: Vector<2>): Vector<2>
    {
        const x = a._[0] - b._[0];
        const y = a._[1] - b._[1];

        const result = Vector_.new([x, y]);

        return result;
    }
}

export class Compute_Max_Zoom_Factor_And_Level 
{
    public readonly max_factor: number;
    public readonly delta_level: number;

    constructor(abs_ratio_target: Matrix<4>, ratio_x: number, current_level: number, alpha: number) 
    {
        const width_target = this.__compute_x_width_target(abs_ratio_target);

        this.max_factor = this.__compute_max_zoom_factor(ratio_x, width_target);

        const max_level = Math.log(this.max_factor) / Math.log(alpha);

        this.delta_level = max_level - current_level;
    }

    private __compute_max_zoom_factor(x_with_wanted: number, x_width_target: number): number 
    {
        if(x_width_target == 0) x_width_target = 1;

        const factor = x_with_wanted / x_width_target;

        return factor;
    }

    private __compute_x_width_target(abs_ratio: Matrix<4>): number 
    {
        return abs_ratio._[1]._[0] - abs_ratio._[0]._[0];
    }
}

