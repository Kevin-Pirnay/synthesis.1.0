import { Vector } from "../../../../common/Vector/Vector";


export interface IMove_View_Handler
{
    move_view_by_delta(delta : Vector<2>) : void;
    move_view_by_delta_in_contious_async(delta : Vector<2>) : Promise<void>;
    stop_move_view() : void
}