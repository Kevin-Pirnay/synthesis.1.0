import { IDto } from "../../../port/driver/dto/IDto";
import { View_Link_Roots_Request } from "../../../port/driver/request/request";
import { View_Link_Roots_Response } from "../../../port/driver/response/Response";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { ILink_Roots_Repository } from "../../repository/interfaces/IRepository";

import { ILink_Roots } from "./Init_Link_Roots";

export class View_Link_Roots_Use_case
{
    constructor(private readonly __repository : ILink_Roots_Repository, private readonly __handler : IView_As_Root_Handler) { }

    public handle(request : View_Link_Roots_Request) : View_Link_Roots_Response
    {
        const indexes : number[] = this.__repository.get_next_indexes(request.direction);        

        const link_roots : ILink_Roots = this.__repository.get_link_roots_data(indexes, this.__handler);

        const dtos : IDto[] = link_roots.anim();

        return new View_Link_Roots_Response(dtos);
    }
}