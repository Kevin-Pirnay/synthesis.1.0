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

        const default_root = Vector_.new([100,100]);

        const subTree : ISubtree_Data = this.__view_as_root_repository.get_subtree(request.container);

        const frontier : ISubtree_Data[] = [];

        frontier.push(subTree[0]);

        let current_pos_root : Vector = default_root;

        while(1)
        {
            const current : ISubtree_Data | undefined = frontier.pop();

            if(!current) break;

            current.set_its_positions(current_pos_root);

            current.update_current_pos_root(current_pos_root);

            current.add_children_to_the_frontier(frontier);

            current.added_to_the_result(result);
        }

        return new View_As_Root_Response(result);
    }
}

export interface ISubtree_Data
{
    set_its_positions(pos : Vector) : void;
    add_children_to_the_frontier(frontier : ISubtree_Data[]) : void;
    added_to_the_result(result : IDto[]) : void;
    update_current_pos_root(current_pos_root : Vector) : void;
}