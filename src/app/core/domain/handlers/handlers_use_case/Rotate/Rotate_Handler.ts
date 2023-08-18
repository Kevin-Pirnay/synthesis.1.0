import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IMove_View_Handler } from "../Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Vector_ } from '../../../../common/Vector/Vector_';


export class Rotate_On_Target_Handler
{
    public async rotate(direction: number, axe_rotation : Vector, center_rotation : Vector, rate : number, max_angle : number, phase : number, data : IRotate_On_Target_Data[]): Promise<void> 
    {
        data.forEach(data => data.init_axe_rotation(axe_rotation));

        let angle = 0;
        while (1) 
        {
            const radian = angle * Math.PI / 180 * direction;
            
            for(let i = 0; i <= data.length; i++)
            {
                const dephasage = radian + (phase * direction * i);

                data[data.length - i].rotate_position_on_a_certain_point(dephasage, center_rotation);
            }

            await new Promise(r => setTimeout(r, 1));

            angle += (1 * rate);

            if (Math.abs(angle) >= max_angle) break;
        }
    }

    public async rotate_and_zoom(direction: number, axe_rotation : Vector, center_rotation : Vector, rate : number, max_angle : number, phase : number, data : IRotate_On_Target_Data[]): Promise<void> 
    {
        data.forEach(data => data.init_axe_rotation(axe_rotation));

        let angle = 0;
        while (1) 
        {
            const radian = angle * Math.PI / 180 * direction;
            
            for(let i = 0; i <= data.length; i++)
            {
                const dephasage = radian + (phase * direction * i);

                data[data.length - i].rotate_position_on_a_certain_point(dephasage, center_rotation);
            }

            await new Promise(r => setTimeout(r, 1));

            angle += (1 * rate);

            if (Math.abs(angle) >= max_angle) break;
        }
    }
}

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


class Zoom_On_Target
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
        const pre_process = new Pre_process(abs_ratio_target, coordinates_wanted, ratio, zoom_handler.get_current_zoom_fator()).result;

        this.__move = new Move_Quadratic_By_Step(pre_process.x_y_normalize, pre_process.distance, move_view_handler);
        this.__zoom = new Zoom_quadratic_By_Step(pre_process.delta_factor, pre_process.distance, zoom_handler);
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
        public readonly delta_factor : number,
        public readonly x_y_normalize : Vector,
        public readonly distance : number
    ) { }
}

class Pre_process
{
    public readonly result : Pre_Process_Result;

    constructor(
        abs_ratio_target: Matrix<4>,
        coordinates_wanted : Vector,
        ratio : number,
        current_zoom_factor : number
    ) {
        this.result = this.__pre_process(abs_ratio_target, coordinates_wanted, ratio, current_zoom_factor);
    }

    private __pre_process(abs_ratio_target: Matrix<4>, coordinates_wanted : Vector, ratio : number, current_zoom_factor : number) : Pre_Process_Result
    {
        const max_factor : number = new Compute_Max_Zoom_Factor(abs_ratio_target, ratio).max_factor;
        const C_D_S = new Compute_Distance(abs_ratio_target, coordinates_wanted, max_factor);
        const delta_factor : number = max_factor - current_zoom_factor;

        return new Pre_Process_Result(delta_factor, C_D_S.x_y_normalize, C_D_S.distance);
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
    private readonly __zoom_factor_step : number;

    constructor(delta_factor : number, distance : number, zoom_handler : IZoom_Handler) 
    { 

    }

    public zoom_by_step(): void 
    {
        throw new Error("Method not implemented.");
    }
}

class Move_Quadratic_By_Step implements IMove_By_Step
{
    private readonly __step_x : number;
    private readonly __step_y : number;
    private readonly __handler : IMove_View_Handler;

    constructor(x_y_normalize : Vector, distance : number, move_handler : IMove_View_Handler) 
    { 
        this.__handler = move_handler;

        this.__step_x = x_y_normalize._[0] / distance;
        const slope = x_y_normalize._[1] / (x_y_normalize[0] ** 2);
        this.__step_y = 2 * slope * this.__step_x
    }

    public move_by_step(): void 
    {
        const delta = Vector_.new([this.__step_x, this.__step_y]);

        this.__handler.move_view_by_delta(delta);
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

        const dist : number = this.__compute_distance(center_target, coordinates_wanted);

        this.distance = dist * max_factor_zoom;

        this.x_y_normalize = this.__compute_x_y_normalize(center_target, coordinates_wanted);
    }
    
    private __compute_distance(a: Vector, b: Vector) : number
    {
        const x2 = (a._[0] - b._[0]) ** 2;
        const y2 = (a._[1] - b._[1]) ** 2;

        return Math.sqrt(x2 + y2);
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

        return Vector_.new([x,y]);
    }
}

class Compute_Max_Zoom_Factor
{
    public readonly max_factor : number;

    constructor(abs_ratio_target: Matrix<4>, ratio_x : number) 
    {
        const width_target = this.__compute_x_width_target(abs_ratio_target);

        this.max_factor = this.__compute_max_zoom_factor(width_target, ratio_x);
    }

    private __compute_max_zoom_factor(x_with_wanted : number, x_width_target : number)
    {
        return x_with_wanted / x_width_target;
    }

    private __compute_x_width_target(abs_ratio: Matrix<4>) : number
    {
        return abs_ratio._[1]._[0] - abs_ratio._[0]._[0];
    }
}