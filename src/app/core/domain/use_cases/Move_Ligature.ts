import { Vector } from "../../common/Vector/Vector";
import { Assign_Ligature_Request } from "../../port/driver/request/Assign_Ligature_Request";
import { Move_ligature_Request } from "../../port/driver/request/Move_ligature_Request";
import { Container } from "../entities/Container";
import { Ligature } from "../entities/Ligature";
import { Node_Linker } from "../handlers/Link_Node/Node_Linker";

export class Move_Ligature_Use_case
{
    constructor(private readonly __node_linker : Node_Linker) { }

    public handle_move_ligature(request : Move_ligature_Request) : void
    {
        const delta : Vector = request.new_pos.__.substract_by_vector_new(request.ligature.positions.abs_ratio._[0]);

        request.ligature.__.update_ratio_by_delta(delta);
    }

    public handle_assign_ligature_to_container(request : Assign_Ligature_Request) : void
    {
        if ( request.container == null ) { request.ligature.__.update_ratio(); return; } // positions come back to the previous state

        const assign_ligature : IAssign_Ligature = Assing_Ligature.get_assign_ligature(this.__node_linker, request.ligature, request.container);

        assign_ligature.update_relationship_in_the_tree();
        assign_ligature.update_the_position_of_the_ligature();
        assign_ligature.update_the_relative_position_of_the_child_container_to_the_new_parent_container();
    }
}

/**
 * step to assign ligature if container is not null in request :
 * step 1: update tree : remove unit from old parent and child , create new unit and add unit to parent and child, change parent ligature
 * step 2: update position ligature
 * step 3: update relative postion child container to new parent container
 */

interface IAssign_Ligature
{
    update_relationship_in_the_tree() : void;
    update_the_position_of_the_ligature() : void;
    update_the_relative_position_of_the_child_container_to_the_new_parent_container() : void;
} 

class Assing_Ligature implements IAssign_Ligature
{
    public static get_assign_ligature(node_linker : Node_Linker, ligature : Ligature, container_to_assign : Container) : IAssign_Ligature
    {
        return new Assing_Ligature(node_linker, ligature, container_to_assign);
    }

    private readonly __node_linker : Node_Linker;
    private readonly __ligature : Ligature;
    private readonly __container_to_assign : Container;

    private readonly __old_parent_container : Container;
    private readonly __child_container : Container;

    constructor(node_linker : Node_Linker, ligature : Ligature, container_to_assign : Container)
    {
        this.__node_linker = node_linker;
        this.__ligature = ligature;
        this.__container_to_assign = container_to_assign;

        this.__old_parent_container = this.__ligature.parent;
        this.__child_container = this.__ligature.child;
    }

    update_relationship_in_the_tree(): void 
    {
        this.__node_linker.remove_unit_from_parent([this.__old_parent_container], this.__child_container);
        this.__node_linker.remove_unit_from_children([this.__child_container], this.__old_parent_container);
        this.__node_linker.link_nodes(this.__container_to_assign, this.__ligature, this.__child_container);
        this.__ligature.parent = this.__container_to_assign;
    }

    update_the_position_of_the_ligature(): void 
    {
        this.__ligature.__.update_ratio();
    }

    update_the_relative_position_of_the_child_container_to_the_new_parent_container(): void 
    {
        const rel_root : Vector = this.__child_container.positions.rel_root;

        const delta_pos_from_parent : Vector = this.__child_container.positions.abs_root.__.substract_by_vector_new(this.__container_to_assign.positions.abs_root);

        rel_root.__.assign_new_data(delta_pos_from_parent);
    } 
}