import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { IMove_View_Handler } from "../../handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { IData_Tree } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { IChange_Flow_Repository } from "../interfaces/IRepository";


export class Change_Flow_Repository implements IChange_Flow_Repository
{
    constructor(
        private __container_dao : IDao_Container,
        private __ligature_dao : IDao_Ligature,
        private __flow_dao : IDao_Flow
    ) { }

    public change_current_flow(flow: string): void 
    {
        this.__flow_dao.change_current_flow(flow);
        this.__ligature_dao.prepare_all_ptr_for_the_current_flow();
        this.__container_dao.prepare_all_ptr_for_the_current_flow();
    }

    public get_root_container_from_the_current_flow(): Container 
    {
        return this.__container_dao.get_root_container_of_the_current_flow();
    }

    /***WARNING need to save the data flow instead of the container ptr because we are not anymore in the right flow so possibility to confuse the ptrs */
    public add_the_subtree_to_another_flow(data_tree_to_merge: IData_Tree[], container_to_link: Container, origin_flow: string, move_view_handler : IMove_View_Handler): IData_Tree[] 
    {
        const data_to_merge : IData_To_Merge = new Data_To_Merge(data_tree_to_merge, container_to_link, origin_flow, move_view_handler, this.__container_dao, this.__ligature_dao, this.__flow_dao);

        data_to_merge.save_the_data_to_merge_in_the_current_flow();
        data_to_merge.translate_the_data_to_merge_according_to_the_container_to_link();
        data_to_merge.create_the_ligature_to_relate_the_container_to_link_to_the_the_root_of_data_to_merge();
        data_to_merge.links_the_nodes();
        return data_to_merge.save_the_new_tree();
    }
}

interface IData_To_Merge
{
    save_the_data_to_merge_in_the_current_flow() : void;
    translate_the_data_to_merge_according_to_the_container_to_link() : void;
    create_the_ligature_to_relate_the_container_to_link_to_the_the_root_of_data_to_merge() : void;
    links_the_nodes() : void;
    save_the_new_tree() : IData_Tree[];
}

class Data_To_Merge implements IData_To_Merge
{
    private readonly __save : ISave_Data;
    private readonly __translate : ITranslate;
    private readonly __ligature : ICreate_Ligature;
    private readonly __nodes : ILink_Nodes;

    constructor(
        data_to_merge: IData_Tree[], 
        container_to_link: Container, 
        origin_flow: string, 
        move_view_handler : IMove_View_Handler, 
        container_dao : IDao_Container, 
        ligature_dao : IDao_Ligature, 
        flow_dao : IDao_Flow) 
    { 

    }

    public save_the_data_to_merge_in_the_current_flow(): void 
    {
        this.__save.save_data_in_the_current_flow();
    }

    public translate_the_data_to_merge_according_to_the_container_to_link(): void 
    {
        this.__translate.translate_data_to_merge();
    }

    public create_the_ligature_to_relate_the_container_to_link_to_the_the_root_of_data_to_merge(): void 
    {
        this.__ligature.create_ligature();
    }

    public links_the_nodes(): void 
    {
        this.__nodes.links_nodes();
    }

    public save_the_new_tree(): IData_Tree[]
    {
        return this.__save.save_the_new_tree();
    }
}

interface ITranslate
{
    translate_data_to_merge(): void;
}

interface ISave_Data
{
    save_the_new_tree(): IData_Tree[];
    save_data_in_the_current_flow(): void;
}

interface ICreate_Ligature
{
    create_ligature(): void;
}

interface ILink_Nodes
{
    links_nodes(): void;
}

class Save_Data implements ISave_Data
{
    constructor() { }
    
    public save_the_new_tree(): IData_Tree[] 
    {
        throw new Error("Method not implemented.");
    }

    public save_data_in_the_current_flow(): void {
        throw new Error("Method not implemented.");
    }
}

class Translate implements ITranslate
{
    constructor() { }
    
    public translate_data_to_merge(): void 
    {
        throw new Error("Method not implemented.");
    }
}

