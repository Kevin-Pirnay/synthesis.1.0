// import { Vector } from "../../../common/Vector/Vector";
// import { IDto } from "../../../port/driver/dto/IDto";
// import { Paginate_Request } from "../../../port/driver/request/Paginate_request";
// import { Paginate_Response } from "../../../port/driver/response/Paginate_Response";
// import { Container, Unit_Node } from "../../entities/Container";
// import { IView_As_Root_Handler } from "../../handlers/View_As_Root/IView_As_Root_Handler";
// import { ISubtree_Root } from "../../handlers/View_As_Root/View_As_Root_Handler";
// import { IPaginate_Repository } from "../../repository/interfaces/IPaginate_Repository";
// import { IView_As_Root_Repository } from "../../repository/interfaces/IView_As_Root_Repository";

// export class Paginate_Use_case
// {
//     constructor(
//         private readonly __paginate_repository : IPaginate_Repository,
//         private readonly __view_as_root_repository : IView_As_Root_Repository,
//         private readonly __view_as_root_handler : IView_As_Root_Handler
//     ) { }
    
//     public handle(request : Paginate_Request) : Paginate_Response
//     {
//         //refactor : put that in view_as_root_repository and remove line above
//         const root_data : ISubtree_Root[] = this.__get_subtrees_root(request.container);

//         this.__paginate_repository.store_subtrees_root(root_data);
        
//         const current_index : number = this.__paginate_repository.init_indexes(root_data.length);

//         const dtos : IDto[] = this.__view_as_root_handler.get_subtree_dtos(root_data[current_index]);

//         return new Paginate_Response(dtos);
//     }

//     private __get_subtrees_root(container : Container) : ISubtree_Root[]
//     {
//         const roots_data : ISubtree_Root[] = [];

//         container.node.children.forEach((unit : Unit_Node) =>
//         {
//             if ( unit.container )
//             {
//                 const root_sub_tree = this.__view_as_root_repository.get_root_subtree(unit.container);
    
//                 roots_data.push(root_sub_tree);
//             }
//         });

//         return roots_data
//     }
// }