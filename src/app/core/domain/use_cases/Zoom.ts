import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Zoom_Request } from "../../port/driver/request/Zoom_Request";
import { IZoomRepository } from "../repository/interfaces/IZoomRepository";

export class Zoom_Use_case
{
    constructor(private readonly __repository : IZoomRepository) { }

    public handle(request : Zoom_Request) : void
    {
        const factor = this.__repository.update_zoom_factor(request.direction);

        const positions : IZoom_Positions[] = this.__repository.get_all_positions();

        this.__zoom(positions, factor);
    }

    private __zoom(positions : IZoom_Positions[], factor : number) : void
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

export interface IZoom_Positions
{
    substract_abs_pos_by_delta(delta : Vector) : void;
    multiply_abs_pos_by_factor(factor : number) : void;
    add_abs_pos_by_delta(delta : Vector) : void;
}
/* need to unzoom each time relative position is involved
/* why need to unzzom
 * create container : parent pos, target pos no need to unzoom but abs_ratio need to be computed
 * move container : no need since rel is updated by delta 
 * 
 * 
 * 
*/