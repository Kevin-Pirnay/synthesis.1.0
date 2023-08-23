import { Container } from "../../../entities/Container";
import { IChange_Flow_Handler } from "../Change_Root/IChange_Flow_Handler";
import { ISubtree_Root, IData_Tree } from "./View_As_Root_Handler";


export interface IView_As_Root_Handler
{
    get_subtree_from_this_container(container : Container): IData_Tree[];
    get_subtree_from_this_container_id(container_id : string): IData_Tree[];
    get_subtree_from_subtree_root(root : ISubtree_Root) : IData_Tree[];
    get_subtree_from_root_of_the_current_flow() : IData_Tree[]; 
}