import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { ISubtree_Root } from "./View_As_Root_Handler";

export interface IView_As_Root_Handler
{
    get_subtree_dtos(default_root: ISubtree_Root, Vector: Vector): IDto[];
}