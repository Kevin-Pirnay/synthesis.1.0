import { IDto } from "../../../../port/driver/dto/IDto";
import { Container } from "../../../entities/Container";
import { IChange_Flow_Repository } from "../../../repository/interfaces/IRepository";
import { IView_As_Root_Handler } from "../View_As_Root/IView_As_Root_Handler";
import { IChange_Flow_Handler } from "./IChange_Flow_Handler";

export class Change_Root_Handler implements IChange_Flow_Handler
{
    constructor(
        private __change_flow_repository : IChange_Flow_Repository,
        private __handler : IView_As_Root_Handler
    ) { }
    
    public change_flow_and_get_subtree_from_the_root(flow: string) : IDto[] 
    {
        this.__change_flow_repository.change_current_flow(flow);

        const root_container : Container = this.__change_flow_repository.get_root_container_from_the_current_flow();
        
        const result : IDto[] = this.__handler.get_subtree_from_this_container(root_container);

        return result;
    }
}