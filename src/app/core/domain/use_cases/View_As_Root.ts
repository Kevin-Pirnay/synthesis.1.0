import { Vector } from "../../common/Vector/Vector";
import { IDto } from "../../port/driver/dto/IDto";
import { View_As_Root_Request } from "../../port/driver/request/View_As_Root_Request";
import { View_As_Root_Response } from "../../port/driver/response/View_As_Root_Response";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";
import { IView_As_Root_Handler } from "../handlers/View_As_Root/IView_As_Root_Handler";
import { ISubtree_Root } from "../handlers/View_As_Root/View_As_Root_Handler";

export class View_As_Root_Use_case
{
    constructor(
        private __handler : IView_As_Root_Handler
    ) { }
    
    //handle zoom
    public handle(request : View_As_Root_Request) : View_As_Root_Response
    {
        const result : IDto[] = this.__handler.get_subtree_dtos(request.container);

        return new View_As_Root_Response(result);
    }
}