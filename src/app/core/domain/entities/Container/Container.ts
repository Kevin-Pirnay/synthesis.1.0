import { Matrix } from "../../../common/Matrix/Matrix";
import { Matrix_ } from "../../../common/Matrix/Matrix_";
import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Ligature } from "../Ligature";

export class Container_
{
    public static new = (ratio : Matrix<4>, pos_target : Vector, abs_root_parent : Vector) : Container =>
    {
        //*** need to unzoom first ***

        const id = crypto.randomUUID();

        const container = new Container(id);

        const rel_root = pos_target.__.substract_by_vector_new(abs_root_parent);

        const abs_root = abs_root_parent.__.add_by_vector_new(rel_root);

        const abs_ratio = ratio.__.add_by_vector_new(abs_root);

        container.positions.rel_ratio.__.assign_new_data(ratio);

        container.positions.rel_root.__.assign_new_data(rel_root);

        container.positions.abs_root.__.assign_new_data(abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);

        return container;
    }
}

export class Container
{
    public readonly id : string;

    public readonly positions = new Positions();

    public readonly node = new Node();

    constructor(id: string) { this.id = id; }
}

class Unit_Node
{
    constructor(public container : Container, public ligature : Ligature) { }
}

class Node
{
    parents : Unit_Node[] = [];

    children : Unit_Node[] = [];
}

class Positions
{
    public readonly rel_root : Vector = Vector_.zero(); // from the c_a parent for ligature or c_l point for container

    public readonly rel_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);

    public readonly abs_root : Vector = Vector_.zero();

    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}