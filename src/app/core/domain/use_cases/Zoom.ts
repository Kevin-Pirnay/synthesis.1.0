import { Zoom_Request } from "../../port/driver/request/request";
import { IZoom_Handeler } from "../handlers/handlers_use_case/Zoom/IZoom_Handeler";


export class Zoom_Use_case
{
    constructor(private readonly __zoom_handler : IZoom_Handeler) { }

    public handle_zoom(request : Zoom_Request) : void
    {
        this.__zoom_handler.zoom_by_direction_in_contious_async(request.direction);   
    }

    public handle_stop_zoom() : void
    {
        this.__zoom_handler.stop_zoom();
    }
}


/* need to unzoom each time relative position is involved
/* why need to unzzom
 * create container : parent pos, target pos no need to unzoom but abs_ratio need to be computed
 * move container : no need since rel is updated by delta 
 * 
 * 
 * 
*/