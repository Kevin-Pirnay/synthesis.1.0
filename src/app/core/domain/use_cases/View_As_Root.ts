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
        private __view_as_root_repository : IView_As_Root_Repository,
        private __handler : IView_As_Root_Handler
    ) { }
    
    //handle zoom
    public handle(request : View_As_Root_Request) : View_As_Root_Response
    {
        const default_root : Vector = this.__view_as_root_repository.get_default_root_pos();
        
        const root_subTree : ISubtree_Root = this.__view_as_root_repository.get_root_subtree(request.container);
        
        const result : IDto[] = this.__handler.get_subtree_dtos(root_subTree, default_root);

        return new View_As_Root_Response(result);
    }
}