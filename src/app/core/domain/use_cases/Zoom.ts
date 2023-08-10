import { Vector } from "../../common/Vector/Vector";
import { Zoom_Request } from "../../port/driver/request/Zoom_Request";
import { IZoom_Handeler } from "../handlers/Zoom/IZoom_Handeler";
import { IZoomRepository } from "../repository/interfaces/IZoomRepository";

export class Zoom_Use_case
{
    constructor(
        private readonly __repository : IZoomRepository,
        private readonly __zoom_handler : IZoom_Handeler) { }

    public handle(request : Zoom_Request) : void
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_positions();

        //unzoom all the positions
        const unzoom_factor = this.__repository.get_unzoom_factor();
        this.__zoom_handler.zoom(positions, unzoom_factor);        
        
        //zoom all the positions by adding one to the factor zoom
        const zoom_factor = this.__repository.update_zoom_factor(request.direction);
        this.__zoom_handler.zoom(positions, zoom_factor);        
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