import { Vector } from "../../../common/Vector/Vector";

export interface IMove_View_Handler
{
    move_view_by_delta(delta : Vector) : void;
    rotate_project(max_angle : number, axis : number, direction : number, rate : number): void;
}