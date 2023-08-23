import { IDto } from "../../../port/driver/dto/IDto";
import { Paginate_Request } from "../../../port/driver/request/request";
import { Paginate_Response } from "../../../port/driver/response/Response";
import { Container, Unit_Node } from "../../entities/Container";
import { ISubtree_Root } from "../../handlers/handlers_use_case/View_As_Root/ISubtree_Root";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Repository, IView_As_Root_Repository } from "../../repository/interfaces/IRepository";


export class Init_Paginate_Use_case
{
    constructor(
        private readonly __paginate_repository : IPaginate_Repository,
        private readonly __view_as_root_repository : IView_As_Root_Repository,
        private readonly __view_as_root_handler : IView_As_Root_Handler
    ) { }
    
    public handle(request : Paginate_Request) : Paginate_Response
    {
        const roots_data : ISubtree_Root[] = this.__get_all_subtrees_roots_from_children_of(request.container);

        this.__paginate_repository.store_subtrees_roots(roots_data);
        
        const current_index : number = this.__paginate_repository.init_indexes(roots_data.length);

        const dtos : IDto[] = this.__view_as_root_handler.get_subtree_from_subtree_root(roots_data[current_index]);

        return new Paginate_Response(dtos);
    }

    private __get_all_subtrees_roots_from_children_of(container : Container) : ISubtree_Root[]
    {
        const roots_data : ISubtree_Root[] = [];

        container.node.children.forEach((unit : Unit_Node) =>
        {
            if ( unit.container )
            {
                const root_sub_tree = this.__view_as_root_repository.get_subtree_root(unit.container);
    
                roots_data.push(root_sub_tree);
            }
        });

        return roots_data
    }
}