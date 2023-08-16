import { Vector } from "../../common/Vector/Vector";
import { Assign_Ligature_Request } from "../../port/driver/request/Assign_Ligature_Request";
import { Move_ligature_Request } from "../../port/driver/request/Move_ligature_Request";
import { INode_Linker } from "../handlers/handlers_use_case/Link_Node/INode_Linker";
import { Assing_Ligature } from "../repository/implementations/injectors/Assing_Ligature";

export class Move_Ligature_Use_case
{
    constructor(private readonly __node_linker : INode_Linker) { }

    public handle_move_ligature(request : Move_ligature_Request) : void
    {
        //refactor
        const delta : Vector = request.new_pos.__.substract_by_vector_new(request.ligature.positions.abs_ratio._[0]);

        request.ligature.__.update_ratio_by_delta(delta);
    }

    public handle_assign_ligature_to_container(request : Assign_Ligature_Request) : void
    {
        if ( request.container == null ) { request.ligature.__.update_ratio(); return; } // positions come back to the previous state

        const assign_ligature : IAssign_Ligature = Assing_Ligature.get_assign_ligature(this.__node_linker, request.ligature, request.container);

        assign_ligature.update_relationship_in_the_tree();
        assign_ligature.update_its_own_position();
        assign_ligature.update_the_relative_position_of_its_child_container_to_the_new_parent_container();
    }
}

/**
 * step to assign ligature if container is not null in request :
 * step 1: update tree : remove unit from old parent and child , create new unit and add unit to parent and child, change parent ligature
 * step 2: update position ligature
 * step 3: update relative postion child container to new parent container
 */

export interface IAssign_Ligature
{
    update_relationship_in_the_tree() : void;
    update_its_own_position() : void;
    update_the_relative_position_of_its_child_container_to_the_new_parent_container() : void;
} 

