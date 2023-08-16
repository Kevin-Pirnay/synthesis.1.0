// import { IDto } from "../../../../port/driver/dto/IDto";
// import { Container } from "../../../entities/Container";
// import { IChange_Root_Repository } from "../../../repository/interfaces/IChange_Root_Repository";
// import { IView_As_Root_Handler } from "../View_As_Root/IView_As_Root_Handler";
// import { IChange_Root_Handler } from "./IChange_Root_Handler";

// export class Change_Root_Handler implements IChange_Root_Handler
// {
//     constructor(
//         private __change_root_repository : IChange_Root_Repository,
//         private __handler : IView_As_Root_Handler
//     ) { }
    
//     //put that in a handler
//     public change_root(flow: string) : IDto[] 
//     {
//         this.__change_root_repository.change_current_flow(flow);

//         const root_container : Container = this.__change_root_repository.get_root_container_from_the_current_flow();
        
//         const result : IDto[] = this.__handler.get_subtree_dtos_by_root_container(root_container);

//         return result;
//     }

//     public get_subtree_from_the_flow(flow: string) : IDto[]
//     {        
//         const root_container : Container = this.__change_root_repository.get_root_container(flow);
        
//         return this.__handler.get_subtree_dtos_by_root_container(root_container);
//     }
// }