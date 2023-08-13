import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";
import { IChange_Root_Repository } from "../../repository/interfaces/IChange_Root_Repository";
import { IView_As_Root_Repository } from "../../repository/interfaces/IView_As_Root_Repository";
import { IView_As_Root_Handler } from "../View_As_Root/IView_As_Root_Handler";
import { ISubtree_Root } from "../View_As_Root/View_As_Root_Handler";
import { IChange_Root_Handler } from "./IChange_Root_Handler";

export class Change_Root_Handler implements IChange_Root_Handler
{
    constructor(
        private __change_root_repository : IChange_Root_Repository,
        private __view_as_root_repository : IView_As_Root_Repository,
        private __handler : IView_As_Root_Handler
    ) { }
    
    //put that in a handler
    public change_root(flow: string) : IDto[] 
    {
        this.__change_root_repository.change_current_flow(flow);

        const root_container : Container = this.__change_root_repository.get_root_container();

        const root_position : Vector = this.__view_as_root_repository.get_default_position_of_the_root();

        const root_data : ISubtree_Root = this.__view_as_root_repository.get_root_subtree(root_container);
        
        const result : IDto[] = this.__handler.get_subtree_dtos(root_data, root_position);

        return result;
    }
}