import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { ISubtree_Root } from "../../handlers/View_As_Root/View_As_Root_Handler";

export interface IView_As_Root_Repository
{
    get_default_root_pos(): Vector;
    get_root_subtree(container: Container): ISubtree_Root;
}