import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Positions } from "../../use_cases/Zoom";

export interface IZoom_Handeler
{
    zoom(positions: IZoom_Positions[], factor: number): void;
    update_container_with_current_zoom(container: Container): void;
    update_unit_with_current_zoom(ligature : Ligature, container: Container): void; 
}