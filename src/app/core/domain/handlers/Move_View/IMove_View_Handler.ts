import { Vector } from "../../../common/Vector/Vector";

export interface IMove_View_Handler
{
    move_view_by_delta(delta : Vector) : void;
}