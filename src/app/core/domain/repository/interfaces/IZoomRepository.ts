import { IZoom_Positions } from "../../use_cases/Zoom";

export interface IZoomRepository
{
    get_all_positions(): IZoom_Positions[];
    update_zoom_factor(direction: number): number;
    get_zoom_factor() : number;
}