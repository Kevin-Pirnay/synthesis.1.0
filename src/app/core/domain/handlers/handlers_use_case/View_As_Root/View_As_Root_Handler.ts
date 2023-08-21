
import { Vector } from "../../../../common/Vector/Vector";
import { Data_Type } from "../../handlers_entities/Data_Type";
import { Container } from "../../../entities/Container";
import { IView_As_Root_Repository } from "../../../repository/interfaces/IRepository";
import { IView_As_Root_Handler } from "./IView_As_Root_Handler";


export class View_As_Root_Handler implements IView_As_Root_Handler
{
    constructor(private readonly __repository : IView_As_Root_Repository) { }

    public get_subtree_from_this_container(container : Container): IData_Tree[] 
    {
        const root_position : Vector<3> = this.__repository.get_default_position_of_the_root();
        
        const subtree_root : ISubtree_Root = this.__repository.get_subtree_root(container);

        return this.__construct_tree_from_the_root_subtree(subtree_root, root_position);
    }

    public get_subtree_from_this_container_id(container_id: string): IData_Tree[] 
    {
        const root_position : Vector<3> = this.__repository.get_default_position_of_the_root();
        
        const root_subTree : ISubtree_Root = this.__repository.get_subtree_root_by_id(container_id);

        return this.__construct_tree_from_the_root_subtree(root_subTree, root_position);
    }

    public get_subtree_from_subtree_root(root_subTree: ISubtree_Root): IData_Tree[] 
    {
        const root_position : Vector<3> = this.__repository.get_default_position_of_the_root();

        return this.__construct_tree_from_the_root_subtree(root_subTree, root_position);
    }

    public get_subtree_from_root_of_the_current_flow() : IData_Tree[] 
    {
        const root_position : Vector<3> = this.__repository.get_default_position_of_the_root();

        const root_subtree_root_flow : ISubtree_Root = this.__repository.get_subtree_root_from_root_flow();

        return this.__construct_tree_from_the_root_subtree(root_subtree_root_flow, root_position);
    }

    private __construct_tree_from_the_root_subtree(root_subTree : ISubtree_Root, root_position : Vector<3>) : IData_Tree[]  
    {
        const result : IData_Tree[] = [];

        root_subTree.set_its_positions(root_position);

        const frontier : ISubtree_Root[] = [];

        frontier.push(root_subTree);

        while(1)
        {
            const current : ISubtree_Root | undefined = frontier.pop();

            if(!current) break;

            const children : ISubtree_Root[] =  current.get_his_children();

            current.set_children_positions(children);

            current.add_children_to_the_frontier(frontier, children);

            current.added_to_the_result(result);
        }
    
        return result;
    }
}

export interface IData_Tree
{
    element : any;
    type : Data_Type
}

export interface ISubtree_Root
{
    set_its_positions(pos : Vector<3>) : void;
    add_children_to_the_frontier(frontier : ISubtree_Root[], children : ISubtree_Root[]) : void;
    added_to_the_result(result : IData_Tree[]) : void;
    get_his_children() : ISubtree_Root[];
    set_children_positions(children : ISubtree_Root[]) : void;
}