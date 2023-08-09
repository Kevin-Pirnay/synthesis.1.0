import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { ISubtree_Root } from "../../use_cases/View_As_Root";

export interface IView_As_Root_Handler
{
    get_subtree_dtos(default_root: ISubtree_Root, Vector: Vector): IDto[];
}