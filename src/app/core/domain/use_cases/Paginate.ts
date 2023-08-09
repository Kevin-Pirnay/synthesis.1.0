import { Vector } from "../../common/Vector/Vector";
import { IDto } from "../../port/driver/dto/IDto";
import { Paginate_Request } from "../../port/driver/request/Paginate_request";
import { Paginate_Response } from "../../port/driver/response/Paginate_Response";
import { Container, Unit_Node } from "../entities/Container";
import { IView_As_Root_Handler } from "../handlers/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Repository } from "../repository/interfaces/IPaginate_Repository";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";
import { ISubtree_Data } from "./View_As_Root";

//get two dto according to the indexes
//set in postion
//animate

export class Paginate_Use_case
{
    constructor(
        private readonly __paginate_repository : IPaginate_Repository,
        private readonly __view_as_root_repository : IView_As_Root_Repository,
        private readonly __view_as_root_handler : IView_As_Root_Handler
    ) { }
    
    public handle(request : Paginate_Request) : Paginate_Response
    {
        const default_root_point : Vector = this.__view_as_root_repository.get_default_root_pos();

        const root_subTrees_data : ISubtree_Data[] = this.__get_subtrees_data_root(request.container);

        const result : IDto[][] = this.__get_all_subtrees_dtos(root_subTrees_data, default_root_point);

        this.__paginate_repository.store_subtrees_dtos(result);

        this.__paginate_repository.init_indexes(result.length);

        return new Paginate_Response(result[0]);
    }

    private __get_all_subtrees_dtos(root_subTrees_data : ISubtree_Data[], default_root : Vector) : IDto[][]
    {
        const result : IDto[][] = [];

        root_subTrees_data.forEach((root_subtree : ISubtree_Data) =>
        {
            const dtos : IDto[] = this.__view_as_root_handler.get_subtree_dtos(root_subtree, default_root);

            result.push(dtos);
        });

        return result
    }

    private __get_subtrees_data_root(container : Container) : ISubtree_Data[]
    {
        const root_subTrees_data : ISubtree_Data[] = [];

        container.node.children.forEach((unit : Unit_Node) =>
        {
            const root_sub_tree = this.__view_as_root_repository.get_root_subtree(unit.container);

            root_subTrees_data.push(root_sub_tree);
        });

        return root_subTrees_data
    }
}