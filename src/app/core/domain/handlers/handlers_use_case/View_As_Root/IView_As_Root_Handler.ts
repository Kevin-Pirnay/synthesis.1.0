import { IDto } from "../../../../port/driver/dto/IDto";
import { Container } from "../../../entities/Container";
import { ISubtree_Root, IData_Tree } from "./View_As_Root_Handler";


export interface IView_As_Root_Handler
{
    get_subtree_from_this_container(container : Container): IData_Tree[] 
}