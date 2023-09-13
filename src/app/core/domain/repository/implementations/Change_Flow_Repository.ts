import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IData_Tree } from "../../handlers/handlers_use_case/View_As_Root/IData_Tree";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IChange_Flow_Repository } from "../interfaces/IRepository";
import { Data_To_Merge } from "./injectors/Data_To_Merge";


export class Change_Flow_Repository implements IChange_Flow_Repository
{
    constructor(
        private __container_dao : IDao_Container,
        private __ligature_dao : IDao_Ligature,
        private __flow_dao : IDao_Flow
    ) { }

    public change_the_current_flow(flow: string): void 
    {
        this.__flow_dao.change_current_flow(flow);
        this.__ligature_dao.prepare_all_ptr_for_the_current_flow();
        this.__container_dao.prepare_all_ptr_for_the_current_flow();
    }

    public get_root_container_from_the_current_flow(): Container 
    {
        return this.__container_dao.get_root_container_of_the_current_flow();
    }

    public add_the_subtree_to_another_flow(data_tree_to_merge: IData_Tree[], container_to_link: Container, origin_flow: string, node_linker : INode_Linker, view_as_root_handler : IView_As_Root_Handler): IData_Tree[] 
    {
        const data_to_merge : IData_To_Merge = new Data_To_Merge(data_tree_to_merge, container_to_link, origin_flow, view_as_root_handler, node_linker, this.__container_dao, this.__ligature_dao, this.__flow_dao);

        data_to_merge.save_the_data_to_merge_in_the_original_flow();
        data_to_merge.change_the_current_flow_into_the_original();
        data_to_merge.translate_the_data_to_merge_according_to_the_container_to_link();
        const ligature : Ligature = data_to_merge.create_the_ligature_to_link_the_container_to_the_root_of_data_to_merge();
        data_to_merge.links_nodes(container_to_link, ligature, data_tree_to_merge[0].element);
        
        return data_to_merge.get_the_new_tree();
    }
}

export interface IData_To_Merge
{
    save_the_data_to_merge_in_the_original_flow() : void;
    change_the_current_flow_into_the_original() : void;
    translate_the_data_to_merge_according_to_the_container_to_link() : void;
    create_the_ligature_to_link_the_container_to_the_root_of_data_to_merge() : Ligature;
    links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    get_the_new_tree(): IData_Tree[];
}

