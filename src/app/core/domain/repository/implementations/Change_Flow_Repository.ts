import { Vector_ } from "../../../common/Vector/Vector_";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { Data_Type } from "../../handlers/handlers_entities/Data_Type";
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
        const ligature : Ligature = data_to_merge.create_the_ligature_to_link_the_container_to_the_the_root_of_data_to_merge();
        data_to_merge.links_nodes(container_to_link, ligature, data_tree_to_merge[0].element);
        
        return data_to_merge.get_the_new_tree();
    }
}

interface IData_To_Merge
{
    save_the_data_to_merge_in_the_original_flow() : void;
    change_the_current_flow_into_the_original() : void;
    translate_the_data_to_merge_according_to_the_container_to_link() : void;
    create_the_ligature_to_link_the_container_to_the_the_root_of_data_to_merge() : Ligature;
    links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    get_the_new_tree(): IData_Tree[] 
}

class Data_To_Merge implements IData_To_Merge
{
    private readonly __save : ISave_Data;
    private readonly __translate : ITranslate;
    private readonly __ligature : ICreate_Ligature;
    private readonly __nodes : ILink_Nodes;
    private readonly __flow : IChange_Flow;

    constructor(
        data_to_merge: IData_Tree[], 
        container_to_link: Container, 
        origin_flow: string, 
        view_as_root_handler : IView_As_Root_Handler,
        nodes_linker : INode_Linker,
        container_dao : IDao_Container, 
        ligature_dao : IDao_Ligature, 
        flow_dao : IDao_Flow) 
    { 
        this.__save = new Save_Data(data_to_merge, container_dao, ligature_dao, origin_flow, view_as_root_handler);
        this.__translate = new Translate(data_to_merge, container_to_link);
        this.__ligature = new Create_Ligature(data_to_merge, container_to_link, ligature_dao);
        this.__nodes = new Link_Nodes(nodes_linker);
        this.__flow = new Change_Flow(origin_flow,flow_dao);
    }

    public save_the_data_to_merge_in_the_original_flow(): void 
    {
        this.__save.save_data_in_the_current_flow();
    }

    public change_the_current_flow_into_the_original(): void 
    {
        this.__flow.change_the_current_flow();
    }

    public translate_the_data_to_merge_according_to_the_container_to_link(): void 
    {
        this.__translate.translate_data_to_merge();
    }

    public create_the_ligature_to_link_the_container_to_the_the_root_of_data_to_merge(): Ligature 
    {
        return this.__ligature.create_ligature();
    }

    public links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    {
        this.__nodes.links_nodes(parent_container, ligature, child_container);
    }

    public get_the_new_tree(): IData_Tree[] 
    {
        return this.__save.get_the_new_tree();
    }
}

interface ITranslate
{
    translate_data_to_merge(): void;
}

interface IChange_Flow
{
    change_the_current_flow(): void;
}

interface ISave_Data
{
    get_the_new_tree(): IData_Tree[]; 
    save_data_in_the_current_flow(): void;
}

interface ICreate_Ligature
{
    create_ligature(): Ligature;
}

interface ILink_Nodes
{
    links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
}

class Save_Data implements ISave_Data
{
    constructor(
        private readonly __data : IData_Tree[], 
        private readonly __dao_container : IDao_Container, 
        private readonly __dao_ligature : IDao_Ligature,
        private readonly __flow : string,
        private readonly __view_as_root_handler : IView_As_Root_Handler) { }

    public save_data_in_the_current_flow(): void 
    {
        this.__data.forEach(data =>
        {
            if (data.type == Data_Type.CONTAINER) this.__dao_container.save_the_container_into_this_flow(data.element, this.__flow);
            if (data.type == Data_Type.LIGATURE) this.__dao_ligature.save_the_ligature_into_this_flow(data.element, this.__flow);
        });
    }

    public get_the_new_tree(): IData_Tree[] 
    {
        return this.__view_as_root_handler.get_subtree_from_root_of_the_current_flow();
    }
}

class Translate implements ITranslate
{
    constructor(
        private readonly __data : IData_Tree[],
        private readonly __container_to_link: Container,
    ) { }
    
    public translate_data_to_merge(): void 
    {
        //const x : number = this.__container_to_link.positions.abs_ratio._[0]._[0];

        //const y : number = this.__container_to_link.positions.abs_ratio._[0]._[1];

        const delta = Vector_.new([200,0,0]); //put that in memory

        this.__data[0].element.positions.rel_root.__.assign_new_data(delta); //data[0] is the root of the tree to merge
    }
}

class Change_Flow implements IChange_Flow
{
    constructor(private readonly __flow : string, private readonly __dao_flow : IDao_Flow) { }

    public change_the_current_flow(): void 
    {
        this.__dao_flow.change_current_flow(this.__flow);
    }
}

class Create_Ligature implements ICreate_Ligature
{
    constructor(private readonly __data : IData_Tree[],  private readonly __container_to_link: Container, private readonly __dao_ligature : IDao_Ligature) { }

    public create_ligature(): Ligature 
    {
        const ligature = Ligature_.new(this.__container_to_link, this.__data[0].element);

        this.__dao_ligature.save_the_new_ligature(ligature);

        this.__data.push({element : ligature, type : Data_Type.LIGATURE});

        return ligature;
    }
}

class Link_Nodes implements ILink_Nodes
{
    constructor(private readonly __nodes_linker : INode_Linker) { }

    public links_nodes(parent_container : Container, ligature : Ligature, child_container : Container): void 
    {
        this.__nodes_linker.link_nodes(parent_container, ligature, child_container);
    } 
}

