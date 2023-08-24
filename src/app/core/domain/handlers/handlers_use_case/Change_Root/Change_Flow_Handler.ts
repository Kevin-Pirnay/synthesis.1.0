import { IDto } from "../../../../port/driver/dto/IDto";
import { Container } from "../../../entities/Container";
import { IChange_Flow_Repository } from "../../../repository/interfaces/IRepository";
import { IView_As_Root_Handler } from "../View_As_Root/IView_As_Root_Handler";
import { IChange_Flow_Handler } from "./IChange_Flow_Handler";
import { INode_Linker } from '../Link_Node/INode_Linker';
import { IData_Tree } from "../View_As_Root/IData_Tree";


export class Change_Root_Handler implements IChange_Flow_Handler
{
    constructor(
        private __change_flow_repository : IChange_Flow_Repository,
        private __view_as_root_handler : IView_As_Root_Handler,
        private readonly __node_linker: INode_Linker
    ) { }
    
    public change_flow_and_get_subtree_from_the_root(flow: string) : IDto[] 
    {
        this.__change_flow_repository.change_the_current_flow(flow);

        const root_container : Container = this.__change_flow_repository.get_root_container_from_the_current_flow();
        
        const result : IDto[] = this.__view_as_root_handler.get_subtree_from_this_container(root_container);

        return result;
    }

    public merge_subtrees_of_different_flows(container_to_link: Container, container_to_merge: Container, origin_flow: string): IDto[] 
    {
        const data_to_merge : IData_Tree[] = this.__view_as_root_handler.get_subtree_from_this_container(container_to_merge);

        const data : IData_Tree[] = this.__change_flow_repository.add_the_subtree_to_another_flow(data_to_merge, container_to_link, origin_flow, this.__node_linker, this.__view_as_root_handler);

        return data;
    }
}