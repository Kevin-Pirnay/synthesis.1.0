import { IDto } from '../../../port/driver/dto/IDto';
import { Select_Link_Roots_Request } from "../../../port/driver/request/Select_Link_Roots_Request";
import { Select_Link_Roots_Response } from "../../../port/driver/response/Select_Link_Roots_Response";
import { ILink_Roots_Repository } from "../../repository/interfaces/ILink_Roots_Repository";


export class Select_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
    ) { }

    public handle(request : Select_Link_Roots_Request) : Select_Link_Roots_Response
    {
        const dtos : IDto[] = this.__repository.links_roots(request.container);
     
        return new Select_Link_Roots_Response(dtos);
    }
}