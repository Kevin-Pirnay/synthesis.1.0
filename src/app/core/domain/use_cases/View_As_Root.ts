import { IView_As_Root_Handler } from './../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';
import { IDto } from "../../port/driver/dto/IDto";
import { View_As_Root_Request } from "../../port/driver/request/View_As_Root_Request";
import { View_As_Root_Response } from "../../port/driver/response/View_As_Root_Response";

export class View_As_Root_Use_case
{
    constructor(
        private __handler : IView_As_Root_Handler
    ) { }
    
    //handle zoom
    // public handle(request : View_As_Root_Request) : View_As_Root_Response
    // {
    //     // const result : IDto[] = this.__handler.get_subtree_dtos_by_root_container(request.container);

    //     // return new View_As_Root_Response(result);
    // }
}