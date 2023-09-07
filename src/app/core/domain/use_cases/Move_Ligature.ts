import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Assign_Ligature_Request, Move_ligature_Request } from "../../port/driver/request/request";
import { INode_Linker } from "../handlers/handlers_use_case/Link_Node/INode_Linker";
import { Assing_Ligature } from "../repository/implementations/injectors/Assing_Ligature";
import { Moving_Ligature } from "../repository/implementations/injectors/Moving_Ligature";


export class Move_Ligature_Use_case
{
    constructor(private readonly __node_linker : INode_Linker) { }

    public handle_move_ligature(request : Move_ligature_Request) : void
    {
        const moving_ligature = Moving_Ligature.get_moving_ligature_injector(request.ligature); 
        
        const margin = Vector_.new([-6,-6,0]);

        const adjust_pos : Vector<3> = moving_ligature.substract_a_margin_to_the_target_position_to_let_a_margin_between_the_cursor_and_the_ligature(request.new_pos, margin) //in order_to have access to the container under the grip

        const delta : Vector<3> = moving_ligature.get_the_delta_between_its_position_and_this_position(adjust_pos);

        moving_ligature.update_its_position_according_to_the_delta(delta);
    }

    public handle_assign_ligature_to_container(request : Assign_Ligature_Request) : void
    {
        if ( request.container == null ) { request.ligature.__.update_ratio(); return; } // positions come back to the previous state

        const assign_ligature : IAssign_Ligature = Assing_Ligature.get_assign_ligature_injector(this.__node_linker, request.ligature, request.container);

        assign_ligature.update_relationship_in_the_tree();

        assign_ligature.update_its_own_position();
        
        assign_ligature.update_the_relative_position_of_its_child_container_to_the_new_parent_container();
    }
}

export interface IMoving_Ligature
{
    substract_a_margin_to_the_target_position_to_let_a_margin_between_the_cursor_and_the_ligature(target_pos : Vector<3>, margin : Vector<3>) : Vector<3>;
    get_the_delta_between_its_position_and_this_position(target_pos : Vector<3>) : Vector<3>;
    update_its_position_according_to_the_delta(delta : Vector<3>) : void;
}

export interface IAssign_Ligature
{
    update_relationship_in_the_tree() : void;
    update_its_own_position() : void;
    update_the_relative_position_of_its_child_container_to_the_new_parent_container() : void;
} 

