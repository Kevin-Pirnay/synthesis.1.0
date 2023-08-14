import { Vector } from "../../../common/Vector/Vector";
import { Data_Type, IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";
import { IView_As_Root_Repository } from "../../repository/interfaces/IView_As_Root_Repository";
import { IView_As_Root_Handler } from "./IView_As_Root_Handler";

export class View_As_Root_Handler implements IView_As_Root_Handler
{
    constructor(private readonly __repository : IView_As_Root_Repository) { }

    public get_subtree_dtos(container : Container): IData_Tree[] 
    {
        const root_position : Vector = this.__repository.get_default_position_of_the_root();
        
        const root_subTree : ISubtree_Root = this.__repository.get_root_subtree(container);

        return this.__construct_tree(root_subTree, root_position);
    }

    public get_subtree_dtos_by_id(container_id : string) : IData_Tree[] 
    {
        const root_position : Vector = this.__repository.get_default_position_of_the_root();
        
        const root_subTree : ISubtree_Root = this.__repository.get_root_subtree_by_id(container_id);

        return this.__construct_tree(root_subTree, root_position);
    }

    private __construct_tree(root_subTree : ISubtree_Root, root_position : Vector) : IData_Tree[]  
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
    _ : any;
    type : Data_Type
}

export interface ISubtree_Root
{
    set_its_positions(pos : Vector) : void;
    add_children_to_the_frontier(frontier : ISubtree_Root[], children : ISubtree_Root[]) : void;
    added_to_the_result(result : IDto[]) : void;
    get_his_children() : ISubtree_Root[];
    set_children_positions(children : ISubtree_Root[]) : void;
}