import { IDto } from "../../../port/driver/dto/IDto";
import { View_Choose_Root_Request } from "../../../port/driver/request/View_Choose_Root_Request";
import { View_Choose_Root_Response } from "../../../port/driver/response/View_Choose_Root_Response";
import { IChoose_Root_Repository } from "../../repository/interfaces/IChoose_Root_Repository";
import { IChoose_Root_Roots } from "./Init_Choose_Root";

export class View_Choose_Root_Use_case
{
    constructor(private __repository : IChoose_Root_Repository) { }

    public handle(request : View_Choose_Root_Request) : View_Choose_Root_Response
    {
        const indexes : number[] = this.__repository.get_next_indexes(request.direction);        

        const choose_root_data : IChoose_Root_Roots = this.__repository.get_choose_root_roots(indexes);

        choose_root_data.rotate(request.direction);

        const dtos : IDto[] = choose_root_data.get_dtos(indexes);

        return new View_Choose_Root_Response(dtos);
    }
}