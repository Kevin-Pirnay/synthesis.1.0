import { Vector } from "../../../../common/Vector/Vector";
import { IData_Tree } from "../View_As_Root/View_As_Root_Handler";


export interface IMove_View_Handler
{
    move_the_subtree_by_delta(data_to_merge: IData_Tree[], delta: Vector<3>): void;
    move_view_by_delta(delta : Vector<2>) : void;
    move_view_by_delta_in_contious_async(delta : Vector<2>) : Promise<void>;
    stop_move_view() : void
}