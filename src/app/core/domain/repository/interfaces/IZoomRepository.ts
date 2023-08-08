import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Positions } from "../../use_cases/Zoom";

export interface IZoomRepository
{
    get_all_positions(): IZoom_Positions[];
    update_zoom_factor(direction: number): number;
    get_zoom_factor() : number;
    get_unzoom_factor() : number;
    get_container_positions_by_ptr(container : Container) : IZoom_Positions
    get_ligature_positions_by_ptr(ligature : Ligature) : IZoom_Positions
    get_unit_positions_by_ptr(ligature : Ligature, container : Container) : IZoom_Positions[]
}