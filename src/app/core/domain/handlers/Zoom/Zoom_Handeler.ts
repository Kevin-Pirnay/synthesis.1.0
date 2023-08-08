import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { IZoom_Positions } from "../../use_cases/Zoom";
import { IZoom_Handeler } from "./IZoom_Handeler";

export class Zoom_Handeler implements IZoom_Handeler
{
    public zoom(positions : IZoom_Positions[], factor : number) : void
    {
        const center : Vector = Vector_.new([window.innerWidth / 2, window.innerHeight / 2]);

        positions.forEach((position : IZoom_Positions) =>
        {
            //move center to origin
            position.substract_abs_pos_by_delta(center);

            //multiply factor
            position.multiply_abs_pos_by_factor(factor);

            //move back to center 
            position.add_abs_pos_by_delta(center);
        });
    }
}