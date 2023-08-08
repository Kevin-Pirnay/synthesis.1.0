import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { ISubtree_Data } from "../../use_cases/View_As_Root";
import { IView_As_Root_Handler } from "./IView_As_Root_Handler";

export class View_As_Root_Handler implements IView_As_Root_Handler
{
    public get_subtree_dtos(root_subTree: ISubtree_Data, default_root: Vector): IDto[] 
    {
        const result : IDto[] = [];

        root_subTree.set_its_positions(default_root);

        const frontier : ISubtree_Data[] = [];

        frontier.push(root_subTree);

        while(1)
        {
            const current : ISubtree_Data | undefined = frontier.pop();

            if(!current) break;

            const children : ISubtree_Data[] =  current.get_his_children();

            current.set_children_positions(children);

            current.add_children_to_the_frontier(frontier, children);

            current.added_to_the_result(result);
        }
    
        return result;
    }
}