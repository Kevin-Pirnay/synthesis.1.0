import { IDto } from "../../../port/driver/dto/IDto";
import { View_Link_Roots_Request } from "../../../port/driver/request/View_Link_Roots_Request";
import { View_Link_Roots_Response } from "../../../port/driver/response/View_Link_Roots_Response";
import { ILink_Roots_Repository } from "../../repository/interfaces/ILink_Roots_Repository";
import { ILink_Roots } from "./Init_Link_Roots";

export class View_Link_Roots
{
    constructor(private readonly __repository : ILink_Roots_Repository) { }

    public handle(request : View_Link_Roots_Request) : View_Link_Roots_Response
    {
        const indexes : number[] = this.__repository.get_next_indexes(request.direction);        

        const link_roots : ILink_Roots = this.__repository.get_link_roots_data(indexes);

        const dtos : IDto[] = link_roots.anim();

        return new View_Link_Roots_Response(dtos);
    }
}