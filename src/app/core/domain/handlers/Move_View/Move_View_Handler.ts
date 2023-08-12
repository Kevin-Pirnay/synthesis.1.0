import { publish } from "rxjs";
import { IMove_View_Repository } from "../../repository/interfaces/IMove_View_Repository";
import { IMove_View_Handler } from "./IMove_View_Handler";
import { Vector } from "../../../common/Vector/Vector";
import { IMove_View_Positions } from "../../use_cases/Move_View";
import { Matrix } from "../../../common/Matrix/Matrix";

export class Move_View_Handler implements IMove_View_Handler
{
    constructor(private readonly __repository : IMove_View_Repository) { }

    public async rotate_project(max_angle: number, axis: number, direction: number, rate: number): Promise<void> 
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_positions();
        const copies : Matrix<any>[] = [];
        positions.forEach(position => copies.push(position.copy()));

        let angle = 0;
        let radian = 0;
        while(1)
        {
            radian = direction * angle * Math.PI / 180;

            for(let i = 0; i < copies.length; i++)
            {
                positions[i].assign_values(copies[i].__.rotate_y_new(radian));
            }

            await new Promise(r => setTimeout(r, 1));
            angle += (1 * rate);
            if(Math.abs(angle) >= max_angle) break;
        }
    }

    public move_view_by_delta(delta : Vector) : void
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_positions();

        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }
}