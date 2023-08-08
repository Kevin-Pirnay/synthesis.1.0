import { Container } from "../../entities/Container";
import { ISubtree_Data } from "../../use_cases/View_As_Root";

export interface IView_As_Root_Repository
{
    get_subtree(container: Container): ISubtree_Data;
}