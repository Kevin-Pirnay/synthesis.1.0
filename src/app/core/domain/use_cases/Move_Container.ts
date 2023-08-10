import { Vector } from "../../common/Vector/Vector";
import { Move_Container_Request } from "../../port/driver/request/Move_Container_Request";
import { Container, Unit_Node } from "../entities/Container";

/**
 * step 1 : update position container
 * step 2 : update positions children ligatures and the relative positions of the children containers
 * step 3 : update positions of the parents ligatures
 */

export class Move_Container_Use_case
{
    public handle(request : Move_Container_Request) : void
    {
        const move_container : IMove_Container = Move_Container.get_move_container(request.new_pos, request.container);
        const delta = move_container.get_the_delta_from_its_current_position_and_the_target_position();
        move_container.update_its_position(delta);
        move_container.update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta);
        move_container.update_positions_of_its_parents_ligatures();
    }
}

interface IMove_Container
{
    get_the_delta_from_its_current_position_and_the_target_position() : Vector;
    update_its_position(delta : Vector) : void;
    update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta : Vector) : void;
    update_positions_of_its_parents_ligatures() : void 
}

class Move_Container implements IMove_Container
{
    public static get_move_container(target_position : Vector, container : Container) : IMove_Container
    {
        return new Move_Container(target_position, container);
    }

    constructor(private readonly __target_position : Vector, private readonly __container : Container) { }

    public get_the_delta_from_its_current_position_and_the_target_position() : Vector 
    {
        const delta = this.__target_position.__.substract_by_vector_new(this.__container.positions.abs_root);

        return delta;
    }

    public update_its_position(delta : Vector): void 
    {
        this.__container.__.update_position_by_delta(delta);

    }

    public update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta : Vector): void 
    {
        this.__container.node.children.forEach((unit : Unit_Node) =>
        {
            if ( unit.container ) unit.container.positions.rel_ratio.__.substract_by_vector(delta);

            if ( unit.ligature ) unit.ligature.__.update_ratio();
        });
    }

    public update_positions_of_its_parents_ligatures(): void 
    {
        this.__container.node.parent.ligature?.__.update_ratio();
    }
}