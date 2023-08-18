import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";


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

