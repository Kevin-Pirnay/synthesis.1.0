import { Ligature } from './../../../entities/Ligature';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { Cramer_Quadratic } from '../../../../common/Cramer/Cramer';
import { Matrix_ } from '../../../../common/Matrix/Matrix_';
import { IData_Tree } from "../View_As_Root/IData_Tree";
import { IRotate_On_Taget } from "./IRotate_On_Taget";
import { Zoom_And_Rotate_Inputs } from "./Zoom_And_Rotate_Inputs";
import { Container } from "../../../entities/Container";
import { Data_Type } from "../../../entities/Data_Type";


export class Rotate_On_Target implements IRotate_On_Taget
{
   private readonly __positions : IRotate_Positions_On_Target;
   private readonly __step : IStep;

    constructor (inputs: Zoom_And_Rotate_Inputs)
    {   
        const data_positions : IRotate_Position_Data[] = this.__get_rotation_positions_data_injector(inputs.data);

        this.__positions = Rotate_Positions_On_Target.get_rotate_positions_injector(data_positions, inputs.center_rotation, inputs.phase, inputs.axe_rotation, inputs.direction, inputs.max_angle, inputs.delta_level, inputs.zoom_handler);

        this.__step = new Step(inputs.max_angle);
    }
    
    public async zoom_and_rotate() : Promise<void>
    {        
        this.__step.init();

        this.__positions.init_phase();

        this.__positions.init_axe_rotation();

        while(1)
        {
            if ( this.__step.completed() ) break;

            this.__positions.zoom_by_step();
            
            this.__positions.rotate_by_step();

            this.__step.next_step();

            await new Promise(r => setTimeout(r, 10));
        }
    }

    private __get_rotation_positions_data_injector(data : IData_Tree[]) : IRotate_Position_Data[]
    {
        const result : IRotate_Position_Data[] = [];

        data.forEach((data : IData_Tree) =>
        {
            if ( data.type == Data_Type.CONTAINER ) result.push(new Container_Rotate_Position_Data(data.element));

            if ( data.type == Data_Type.LIGATURE ) result.push(new Ligature_Rotate_Position_Data(data.element));
        });

        return result;
    }
}

interface IRotate_Positions_On_Target
{
    rotate_by_step(): void;
    zoom_by_step(): void;
    init_axe_rotation(): void;
    init_phase() : void;
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

    public init_phase(): void 
    {
        this.__rotate.init_phase();
    }

    public static get_rotate_positions_injector(
        positions: IRotate_Position_Data[], 
        center_point : Vector<2>, 
        phase : number, 
        axe_rotation : Vector<2>,
        direction : number, 
        max_angle : number, 
        delta_level : number, 
        zoom_handler : IZoom_Handler 
    ) : Rotate_Positions_On_Target
    {
        return new Rotate_Positions_On_Target(positions, center_point, phase, axe_rotation, direction, max_angle, delta_level, zoom_handler);
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
    completed(): boolean;
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

    public completed(): boolean 
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
    init_phase() : void;
}

class Zoom_quadratic_By_Step implements IZoom_By_Step
{
    private readonly __handler: IZoom_Handler;
    private __current_level: number;
    private readonly __zoom : IZoom_by_Step_;
    private readonly __original_zoom_level : number;

    constructor(delta_zoom_level: number, max_angle: number, zoom_handler: IZoom_Handler) 
    {
        this.__handler = zoom_handler;

        this.__current_level = zoom_handler.get_current_level();

        this.__original_zoom_level = this.__current_level;

        const points : Vector<2>[] = this.__get_caracteristics_shape_function_points(max_angle, delta_zoom_level, this.__current_level);

        this.__zoom = Zoom_by_Step_.get_zoom_injector(points[0],points[1],points[2]);
    }

    private __get_caracteristics_shape_function_points(max_angle : number,delta_zoom_level : number, current_level : number) : Vector<2>[]
    {
        const p1 = new Vector([0, current_level]);
        const p2 = new Vector([max_angle / 2, delta_zoom_level / 2]); //put that in memory
        const p3 = new Vector([max_angle, delta_zoom_level]);

        return [p1,p2,p3];
    }

    public zoom_by_step(): void 
    {
       this.__zoom.increment_the_x_of_this_step_by(1);

       const current_y : number = this.__zoom.compute_the_current_y_of_this_step();

       const delta : number = this.__zoom.compute_the_delta_between_this_step_and_the_previous_step(current_y);

        this.__current_level += delta;

        this.__handler.zoom_current_flow_by_level(this.__current_level);

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

    public init_phase() : void
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

class Container_Rotate_Position_Data implements IRotate_Position_Data
{
    private readonly __abs_ratio: Matrix<any>;

    constructor(container : Container) 
    {
        this.__abs_ratio = container.positions.abs_ratio;
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

class Ligature_Rotate_Position_Data implements IRotate_Position_Data
{
    constructor(private readonly __ligature : Ligature) { }

    public init_axe_rotation(axe_rotation : Vector<2>): void 
    {
        this.__ligature.__.update_ratio(); //rotate ligature position by computation with the matrix doesn't work well
    }

    public rotate_position_on_a_certain_point(matrix_rotation : Matrix<3>, center: Vector<3>): void 
    {
        this.__ligature.__.update_ratio(); //rotate ligature position by computation with the matrix doesn't work well
    }
}

