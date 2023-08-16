import { Vector } from "../../common/Vector/Vector";
import { Move_Container_Request } from "../../port/driver/request/Move_Container_Request";
import { Move_Container } from "../repository/implementations/injectors/Move_Container";


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

export interface IMove_Container
{
    get_the_delta_from_its_current_position_and_the_target_position() : Vector;
    update_its_position(delta : Vector) : void;
    update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta : Vector) : void;
    update_positions_of_its_parents_ligatures() : void 
}

