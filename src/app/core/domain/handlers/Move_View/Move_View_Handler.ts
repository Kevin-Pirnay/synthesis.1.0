import { publish } from "rxjs";
import { IMove_View_Repository } from "../../repository/interfaces/IMove_View_Repository";
import { IMove_View_Handler } from "./IMove_View_Handler";
import { Vector } from "../../../common/Vector/Vector";
import { IMove_View_Positions } from "../../use_cases/Move_View";

export class Move_View_Handler implements IMove_View_Handler
{
    constructor(private readonly __repository : IMove_View_Repository) { }


    public move_view_by_delta(delta : Vector) : void
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_positions();

        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }
}