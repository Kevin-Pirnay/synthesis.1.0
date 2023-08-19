import { Cramer_Quadratic } from './../../../../common/Cramer/Cramer';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { IMove_View_Handler } from "../Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";


export interface IZoom_On_Target 
{
    move_and_zoom(): void;
}

export class Zoom_On_Target implements IZoom_On_Target 
{
    private readonly __move: IMove_By_Step;
    private readonly __zoom: IZoom_By_Step;
    private readonly __step: IStep;

    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted: Vector<3>,
        ratio: number,
        zoom_handler: IZoom_Handler,
        move_view_handler: IMove_View_Handler
    ) {
        const pre_process = new Pre_process(abs_ratio_target, coordinates_wanted, ratio, zoom_handler.get_current_zoom_fator(), zoom_handler.get_alpha()).result;

        this.__move = new Move_Quadratic_By_Step(pre_process.x_y_normalize, pre_process.distance, move_view_handler, zoom_handler);
        this.__zoom = new Zoom_quadratic_By_Step(pre_process.delta_zoom_level, pre_process.distance, zoom_handler);
        this.__step = new Step(pre_process.distance);
    }

    public async move_and_zoom(): Promise<void> 
    {
        this.__step.init();

        while (1) {
            this.__move.move_by_step();

            this.__zoom.zoom_by_step();

            this.__step.next_step();

            if (this.__step.complete()) break;

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
    move_by_step(): unknown;

}
export interface IZoom_By_Step 
{
    zoom_by_step(): unknown;

}
export interface IStep 
{
    init(): void;
    next_step(): void;
    complete(): boolean;
}

export class Zoom_quadratic_By_Step implements IZoom_By_Step 
{
    private readonly __handler: IZoom_Handler;
    private readonly __coeff_quad_eq: Vector<3>;
    private __current_x = 0;
    private __previous_y: number = 0;
    private __current_level: number = 0;

    constructor(delta_zoom_level: number, distance: number, zoom_handler: IZoom_Handler) 
    {
        this.__handler = zoom_handler;

        const x0 = distance;
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

export class Move_Quadratic_By_Step implements IMove_By_Step 
{
    private readonly __handler: IMove_View_Handler;
    private readonly __zoom_handler: IZoom_Handler;
    private readonly __coeff_quad_eq: Vector<3>;
    private readonly __step_x: number;
    private __current_x: number = 0;
    private __previous_y: number = 0;

    constructor(x_y_normalize: Vector<2>, distance: number, move_handler: IMove_View_Handler, zoom_handler: IZoom_Handler) 
    {
        this.__handler = move_handler;
        this.__zoom_handler = zoom_handler;

        this.__step_x = x_y_normalize._[0] / distance;

        const x = x_y_normalize._[0];
        const y = x_y_normalize._[1];

        const p1 = new Vector([0, 0]);
        const p2 = new Vector([x / 2, (1 / y)]);
        const p3 = new Vector([x, y]);

        this.__coeff_quad_eq = new Cramer_Quadratic(p1, p2, p3).get_coefficients();
    }

    public move_by_step(): void 
    {
        this.__current_x += this.__step_x;

        const a = this.__coeff_quad_eq._[0];
        const b = this.__coeff_quad_eq._[1];
        const c = this.__coeff_quad_eq._[2];
        const x = this.__current_x;

        const current_y = (a * (x * x) + b * x + c);

        const delta = current_y - this.__previous_y;

        const delta_vec = Vector_.new([-this.__step_x * this.__zoom_handler.get_current_zoom_fator(), -delta * this.__zoom_handler.get_current_zoom_fator()]);

        this.__handler.move_view_by_delta(delta_vec);

        this.__previous_y = current_y;
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

    public complete(): boolean 
    {
        return this.__current_step > this.__max_step ? true : false;
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
        const factor = x_with_wanted / x_width_target;

        return factor;
    }

    private __compute_x_width_target(abs_ratio: Matrix<4>): number 
    {
        return abs_ratio._[1]._[0] - abs_ratio._[0]._[0];
    }
}

