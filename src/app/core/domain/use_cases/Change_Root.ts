import { Vector } from "../../common/Vector/Vector";
import { IDto } from "../../port/driver/dto/IDto";
import { Change_Root_Request } from "../../port/driver/request/Change_Root_Request";
import { Change_Root_Response } from "../../port/driver/response/Change_Root_Response";
import { Container } from "../entities/Container";
import { IView_As_Root_Handler } from "../handlers/View_As_Root/IView_As_Root_Handler";
import { ISubtree_Root } from "../handlers/View_As_Root/View_As_Root_Handler";
import { IChange_Root_Repository } from "../repository/interfaces/IChange_Root_Repository";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";

export class Change_Root_Use_case
{
    constructor(
        private __change_root_repository : IChange_Root_Repository,
        private __view_as_root_repository : IView_As_Root_Repository,
        private __handler : IView_As_Root_Handler
    ) { }
    
    public handle(request : Change_Root_Request) : Change_Root_Response
    {
        this.__change_root_repository.change_current_flow(request.flow);

        const root_container : Container = this.__change_root_repository.get_root_container();

        const default_root : Vector = this.__view_as_root_repository.get_default_position_of_the_root();

        const root_subTree : ISubtree_Root = this.__view_as_root_repository.get_root_subtree(root_container);
        
        const result : IDto[] = this.__handler.get_subtree_dtos(root_subTree, default_root);

        return new Change_Root_Response(result);
    }
}