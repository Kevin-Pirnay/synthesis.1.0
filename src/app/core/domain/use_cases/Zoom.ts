import { Vector } from "../../common/Vector/Vector";
import { Zoom_Request } from "../../port/driver/request/Zoom_Request";
import { IZoom_Handeler } from "../handlers/handlers_use_case/Zoom/IZoom_Handeler";


export class Zoom_Use_case
{
    constructor(private readonly __zoom_handler : IZoom_Handeler) { }

    public handle(request : Zoom_Request) : void
    {
        this.__zoom_handler.zoom_current_flow_by_direction(request.direction);   
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