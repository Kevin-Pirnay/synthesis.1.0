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

        mark_as_root.put_its_positions_to_root(root_position);

        mark_as_root.create_its_new_flow();

        //this.__repository.save_flow()

        return mark_as_root.get_dto_response();
    }
}

export interface IMark_As_Root
{
    put_its_positions_to_root(root_point : Vector) : void;
    create_its_new_flow() : void;
    get_dto_response(): Mark_As_Root_Response;
}