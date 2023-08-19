import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";



class Rotate_On_Target
{
    private readonly __step : IStep;
    private readonly __zoom : IZoom_By_Step;
    private readonly __rotate : IRotate_By_Step;

    constructor (max_angle : string, zoom_handler : IZoom_Handler)
    {

    }
        
    
    public zoom_and_rotate() : void
    {
        this.__step.init();

        while(1)
        {
            this.__zoom.zoom_by_step();

            this.__rotate.rotate_by_step();

            if ( this.__step.complete() ) break;

            this.__step.next_step();
        }
    }
    private __zoom_zoom_by_step() {
        throw new Error("Method not implemented.");
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

class Zoom_By_Step implements IZoom_By_Step
{
    public zoom_by_step(): void 
    {
        throw new Error("Method not implemented.");
    }
}

class Rotate_By_Step implements IRotate_By_Step
{
    public rotate_by_step(): void 
    {
        throw new Error("Method not implemented.");
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
        this.__abs_ratio.__.assign_new_data(this.__fix_data.__.rotate_y_new(radian).__.add_by_vector(position));
    }
}

