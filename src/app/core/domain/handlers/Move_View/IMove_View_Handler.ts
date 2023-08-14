import { IDto } from './../../../port/driver/dto/IDto';
import { Vector } from "../../../common/Vector/Vector";
import { Matrix } from '../../../common/Matrix/Matrix';

export interface IMove_View_Handler
{
    move_view_by_delta(delta : Vector) : void;
    rotate_current_project(max_angle : number, axis : number, direction : number, rate : number): void;
    rotate_project(dtos : IDto[], params_start: Matrix<2>, params_result: Matrix<2>, max_angle : number, rate: number, direction: number): Promise<void> 
}