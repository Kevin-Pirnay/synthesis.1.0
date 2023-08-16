import { IDto } from "../../port/driver/dto/IDto";
import { Back_View_Request } from "../../port/driver/request/request";
import { Back_View_Response } from "../../port/driver/response/Response";
import { IView_As_Root_Handler } from "../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";


export class Back_View_Use_case
{
    constructor(
        private __handler : IView_As_Root_Handler
    ) { }

    public handle(request : Back_View_Request) : Back_View_Response
    {
        const dtos : IDto[] = this.__handler.get_subtree_from_this_container_id(request.container_id);

        return new Back_View_Response(dtos);
    }
}