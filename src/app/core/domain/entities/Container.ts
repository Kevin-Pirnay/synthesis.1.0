import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Ligature } from "./Ligature";

//refactor with handler_
export class Container_
{
    public static new = (ratio : Matrix<4>, pos_target : Vector, abs_root_parent : Vector) : Container =>
    {
        //*** need to unzoom first ***

        const container = new Container(crypto.randomUUID());

        const rel_root = pos_target.__.substract_by_vector_new(abs_root_parent);

        const abs_root = abs_root_parent.__.add_by_vector_new(rel_root);

        const abs_ratio = ratio.__.add_by_vector_new(abs_root);

        container.positions.rel_ratio.__.assign_new_data(ratio);

        container.positions.rel_root.__.assign_new_data(rel_root);

        container.positions.abs_root.__.assign_new_data(abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);

        return container;
    }

    constructor(private readonly __container : Container) { }

    public update_position_by_delta = (delta : Vector) : void =>
    {
        const c_pos = this.__container.positions;

        const rel_root = c_pos.rel_root.__.add_by_vector_new(delta);

        const abs_root = c_pos.abs_root.__.add_by_vector_new(delta);

        const abs_ratio = c_pos.rel_ratio.__.add_by_vector_new(abs_root); 

        c_pos.rel_root.__.assign_new_data(rel_root);
        c_pos.abs_root.__.assign_new_data(abs_root);
        c_pos.abs_ratio.__.assign_new_data(abs_ratio);
    }

    public update_position_from_abs_root = (abs_root : Vector) : void =>
    {
        const c_pos = this.__container.positions;

        const abs_ratio = c_pos.rel_ratio.__.add_by_vector_new(abs_root); 

        c_pos.abs_root.__.assign_new_data(abs_root);
        c_pos.abs_ratio.__.assign_new_data(abs_ratio);
    }

    //maybe put that into the repository
    public link_node_unit = (ligature : Ligature, child_container : Container) : void =>
    {
        const child_unit = new Unit_Node(crypto.randomUUID(), ligature, child_container);
        const parent_unit = new Unit_Node(crypto.randomUUID(), ligature, this.__container);

        this.__container.node.children.push(child_unit);
        child_container.node.parents.push(parent_unit);
    }
}

export class Container
{
    public readonly __ = new Container_(this);

    public readonly id : string;

    public readonly positions = new Positions();

    public readonly node = new Node();

    constructor(id: string) { this.id = id; }
}

export class Unit_Node
{
    constructor(public readonly id : string, public readonly ligature : Ligature, public readonly container : Container) { }
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