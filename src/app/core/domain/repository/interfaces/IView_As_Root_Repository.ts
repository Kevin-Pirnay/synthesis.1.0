import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ISubtree_Root } from "../../handlers/View_As_Root/View_As_Root_Handler";

export interface IView_As_Root_Repository
{
    conform_container(container_id : string) : Container;
    conform_ligature(ligature_id : string) : Ligature;
    get_default_root_pos(): Vector;
    get_root_subtree(container: Container): ISubtree_Root;
}