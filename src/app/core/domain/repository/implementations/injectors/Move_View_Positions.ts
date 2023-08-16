import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { IMove_View_Positions } from "../../../handlers/handlers_use_case/Move_View/Move_View_Handler";


export class Container_Move_View_Positions implements IMove_View_Positions 
{
    private readonly __abs_root: Vector;
    private readonly __abs_ratio: Matrix<4>;

    constructor(container: Container) 
    {
        this.__abs_root = container.positions.abs_root;
        this.__abs_ratio = container.positions.abs_ratio;
    }

    public assign_values(matrix: Matrix<any>): void 
    {
        this.__abs_ratio.__.assign_new_data(matrix);
    }

    public copy(): Matrix<4> 
    {
        return this.__abs_ratio.__.copy();
    }

    public move_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
        this.__abs_root.__.add_by_vector(delta);
    }
}


export class Ligature_Move_View_Positions implements IMove_View_Positions 
{
    private readonly __abs_ratio: Matrix<3>;

    constructor(ligature: Ligature) 
    {
        this.__abs_ratio = ligature.positions.abs_ratio;
    }

    public assign_values(matrix: Matrix<any>): void 
    {
        this.__abs_ratio.__.assign_new_data(matrix);
    }

    public copy(): Matrix<3> 
    {
        return this.__abs_ratio.__.copy();
    }

    public move_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
    }
}

