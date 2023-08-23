import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { IZoom_Positions } from "../../../handlers/handlers_use_case/Zoom/IZoom_Positions";


export class Ligature_Zoom_Positions implements IZoom_Positions 
{
    private readonly __abs_ratio: Matrix<3>;

    constructor(ligature: Ligature) 
    {
        this.__abs_ratio = ligature.positions.abs_ratio;
    }

    public substract_abs_pos_by_delta(delta: Vector<3>): void 
    {
        this.__abs_ratio.__.substract_by_vector(delta);
    }

    public multiply_abs_pos_by_factor(factor: number): void 
    {
        this.__abs_ratio.__.multiply_by_factor(factor);
    }

    public add_abs_pos_by_delta(delta: Vector<3>): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
    }
}


export class Container_Zoom_Positions implements IZoom_Positions 
{
    private readonly __abs_root: Vector<3>;
    private readonly __abs_ratio: Matrix<4>;

    constructor(container: Container) 
    {
        this.__abs_root = container.positions.abs_root;
        this.__abs_ratio = container.positions.abs_ratio;
    }

    public substract_abs_pos_by_delta(delta: Vector<3>): void 
    {
        this.__abs_root.__.substract_by_vector(delta);
        this.__abs_ratio.__.substract_by_vector(delta);
    }

    public multiply_abs_pos_by_factor(factor: number): void 
    {
        this.__abs_root.__.multiply_by_factor(factor);
        this.__abs_ratio.__.multiply_by_factor(factor);
    }

    public add_abs_pos_by_delta(delta: Vector<3>): void 
    {
        this.__abs_root.__.add_by_vector(delta);
        this.__abs_ratio.__.add_by_vector(delta);
    }
}

