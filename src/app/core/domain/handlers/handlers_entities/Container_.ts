import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";

//refactor with handler_

export class Container_ 
{
    public static new = (ratio: Matrix<4>, pos_target: Vector, abs_root_parent: Vector) : Container => { return Creation.new(ratio, pos_target, abs_root_parent); }

    constructor(private readonly __container: Container) { }

    public update_position_by_delta = (delta: Vector) : void =>  { Update_Position.update_position_by_delta(this.__container, delta); }

    public update_position_from_abs_root = (abs_root: Vector) => { Update_Position.update_position_from_abs_root(this.__container, abs_root); }
}

class Creation
{
    public static new = (ratio: Matrix<4>, pos_target: Vector, abs_root_parent: Vector): Container => 
    {        
        const container = new Container(crypto.randomUUID());

        const rel_root = pos_target.__.substract_by_vector_new(abs_root_parent);

        const abs_root = abs_root_parent.__.add_by_vector_new(rel_root);

        const abs_ratio = ratio.__.add_by_vector_new(abs_root);

        container.positions.rel_ratio.__.assign_new_data(ratio);

        container.positions.rel_root.__.assign_new_data(rel_root);

        container.positions.abs_root.__.assign_new_data(abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);

        return container;
    };
}

class Update_Position
{
    public static update_position_by_delta = (container : Container, delta: Vector): void => 
    {
        const c_pos = container.positions;

        const rel_root = c_pos.rel_root.__.add_by_vector_new(delta);

        const abs_root = c_pos.abs_root.__.add_by_vector_new(delta);

        const abs_ratio = c_pos.rel_ratio.__.add_by_vector_new(abs_root);

        c_pos.rel_root.__.assign_new_data(rel_root);
        c_pos.abs_root.__.assign_new_data(abs_root);
        c_pos.abs_ratio.__.assign_new_data(abs_ratio);
    };

    public static update_position_from_abs_root = (container : Container, abs_root: Vector): void => 
    {
        const c_pos = container.positions;

        const abs_ratio = c_pos.rel_ratio.__.add_by_vector_new(abs_root);

        c_pos.abs_root.__.assign_new_data(abs_root);
        c_pos.abs_ratio.__.assign_new_data(abs_ratio);
    };
}
