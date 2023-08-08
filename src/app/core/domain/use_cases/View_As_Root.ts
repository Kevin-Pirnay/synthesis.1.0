import { Vector } from "../../common/Vector/Vector";
import { IDto } from "../../port/driver/dto/IDto";
import { View_As_Root_Request } from "../../port/driver/request/View_As_Root_Request";
import { View_As_Root_Response } from "../../port/driver/response/View_As_Root_Response";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";
import { Vector_ } from '../../common/Vector/Vector_';

export class View_As_Root_Use_case
{
    constructor(private __view_as_root_repository : IView_As_Root_Repository) { }
    
    public handle(request : View_As_Root_Request) : View_As_Root_Response
    {
        const result : IDto[] = [];

        const default_root = Vector_.new([100,300]);

        const root_subTree : ISubtree_Data = this.__view_as_root_repository.get_subtree(request.container);

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

        return new View_As_Root_Response(result);
    }
}

export interface ISubtree_Data
{
    set_its_positions(pos : Vector) : void;
    add_children_to_the_frontier(frontier : ISubtree_Data[], children : ISubtree_Data[]) : void;
    added_to_the_result(result : IDto[]) : void;
    get_his_children() : ISubtree_Data[];
    set_children_positions(children : ISubtree_Data[]) : void;
}