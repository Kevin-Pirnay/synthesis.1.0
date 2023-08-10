import { Vector } from "../../common/Vector/Vector";
import { Mark_As_Root_Request } from "../../port/driver/request/Mark_As_Root_Request";
import { Mark_As_Root_Response } from "../../port/driver/response/Mark_As_Root_Response";
import { IMark_As_Root_Repository } from "../repository/interfaces/IMark_As_Root_Repository";

export class Mark_As_Root_Use_case
{
    constructor(private readonly __repository : IMark_As_Root_Repository) { }

    public handle(request : Mark_As_Root_Request) : Mark_As_Root_Response
    {
        const root_position : Vector = this.__repository.get_root_position();

        const mark_as_root : IMark_As_Root = this.__repository.get_mark_as_root_data(request.container);

        mark_as_root.update_its_node_relationship_and_positions_for_the_new_flow(root_position);

        this.__repository.save_new_root(request.container);

        return mark_as_root.get_dto_response();
    }
}

export interface IMark_As_Root
{
    update_its_node_relationship_and_positions_for_the_new_flow(root_position : Vector) : void
    get_dto_response(): Mark_As_Root_Response;
}