import { Vector } from "../../../common/Vector/Vector";
import { Data_Type, IDto } from "../../../port/driver/dto/IDto";
import { IView_As_Root_Handler } from "./IView_As_Root_Handler";

export class View_As_Root_Handler implements IView_As_Root_Handler
{
    public get_subtree_dtos(root_subTree: ISubtree_Root, default_root: Vector): IData_Tree[] 
    {
        const result : IData_Tree[] = [];

        root_subTree.set_its_positions(default_root);

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