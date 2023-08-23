import { IDto } from '../../../port/driver/dto/IDto';
import { Select_Link_Roots_Request } from '../../../port/driver/request/request';
import { Select_Link_Roots_Response } from '../../../port/driver/response/Response';
import { IChange_Flow_Handler } from '../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler';
import { ILink_Roots_Repository } from '../../repository/interfaces/IRepository';


export class Select_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
        private readonly __handler : IChange_Flow_Handler
    ) { }

    public handle(request : Select_Link_Roots_Request) : Select_Link_Roots_Response
    {
        const dtos : IDto[] = this.__repository.links_subtrees(request.container, this.__handler);
     
        return new Select_Link_Roots_Response(dtos);
    }
}