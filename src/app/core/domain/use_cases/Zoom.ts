import { Zoom_Request } from "../../port/driver/request/request";
import { IZoom_Handler } from "../handlers/handlers_use_case/Zoom/IZoom_Handler";


export class Zoom_Use_case
{
    constructor(private readonly __zoom_handler : IZoom_Handler) { }

    public handle_zoom(request : Zoom_Request) : void
    {
        this.__zoom_handler.zoom_by_direction_in_contious_async(request.direction);   
    }

    public handle_stop_zoom() : void
    {
        this.__zoom_handler.stop_zoom();
    }
}
