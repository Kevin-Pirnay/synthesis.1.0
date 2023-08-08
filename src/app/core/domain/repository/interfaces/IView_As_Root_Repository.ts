import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { ISubtree_Data } from "../../use_cases/View_As_Root";

export interface IView_As_Root_Repository
{
    get_default_root_pos(): Vector;
    get_root_subtree(container: Container): ISubtree_Data;
}