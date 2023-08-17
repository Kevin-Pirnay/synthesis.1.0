import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";


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


class Zoom_On_Target_Handler
{
    public async zoom(max_step : number) : Promise<void>
    {
        let step : number = 0;

        while(1)
        {


            if(step >= max_step) break;
        }
    }
}