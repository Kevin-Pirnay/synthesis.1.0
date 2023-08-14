import { IDto } from './../../../port/driver/dto/IDto';
import { Vector } from "../../../common/Vector/Vector";

export interface IMove_View_Handler
{
    move_view_by_delta(delta : Vector) : void;
    rotate_current_project(max_angle : number, axis : number, direction : number, rate : number): void;
    rotate_project(dtos : IDto[], max_angle : number, axis : number, direction : number, rate : number): void;
}