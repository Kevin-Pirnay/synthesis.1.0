import { Vector_ } from "../../../common/Vector/Vector_";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { Data_Type } from "../../entities/Data_Type";
import { Ligature_ } from "../../handlers/handlers_entities/Ligature_";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IData_Tree } from "../../handlers/handlers_use_case/View_As_Root/IData_Tree";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IChange_Flow_Repository } from "../interfaces/IRepository";


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

interface IData_To_Merge
{
    save_the_data_to_merge_in_the_original_flow() : void;
    change_the_current_flow_into_the_original() : void;
    translate_the_data_to_merge_according_to_the_container_to_link() : void;
    create_the_ligature_to_link_the_container_to_the_root_of_data_to_merge() : Ligature;
    links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    get_the_new_tree(): IData_Tree[];
}

class Data_To_Merge implements IData_To_Merge
{
    constructor(
        private readonly data_to_merge: IData_Tree[], 
        private readonly container_to_link: Container, 
        private readonly origin_flow: string, 
        private readonly view_as_root_handler : IView_As_Root_Handler,
        private readonly nodes_linker : INode_Linker,
        private readonly container_dao : IDao_Container, 
        private readonly ligature_dao : IDao_Ligature, 
        private readonly flow_dao : IDao_Flow) 
    { }

    public save_the_data_to_merge_in_the_original_flow(): void 
    {
        this.data_to_merge.forEach(data =>
        {
            if (data.type == Data_Type.CONTAINER)
            {
                const container : Container = data.element;
                container.positions = container.positions.__.copy();
                container.node = container.node.__.copy();
                this.container_dao.save_the_container_into_this_flow(container, this.origin_flow);
            } 

            if (data.type == Data_Type.LIGATURE) this.ligature_dao.save_the_ligature_into_this_flow(data.element, this.origin_flow);
        });
    }

    public change_the_current_flow_into_the_original(): void 
    {
        this.flow_dao.change_current_flow(this.origin_flow);
    }

    public translate_the_data_to_merge_according_to_the_container_to_link(): void 
    {
        const delta = Vector_.new([200,0,0]); //put that in memory

        this.data_to_merge[0].element.positions.rel_root.__.assign_new_data(delta); //data[0] is the root of the tree to merge 
    }

    public create_the_ligature_to_link_the_container_to_the_root_of_data_to_merge(): Ligature 
    {
        const ligature = Ligature_.new(this.container_to_link, this.data_to_merge[0].element);

        this.ligature_dao.save_the_new_ligature(ligature);

        this.data_to_merge.push({element : ligature, type : Data_Type.LIGATURE});

        return ligature;    
    }

    public links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    {
        this.nodes_linker.link_nodes(parent_container, ligature, child_container);
    }

    public get_the_new_tree(): IData_Tree[] 
    {
        return this.view_as_root_handler.get_subtree_from_root_of_the_current_flow();
    }
}