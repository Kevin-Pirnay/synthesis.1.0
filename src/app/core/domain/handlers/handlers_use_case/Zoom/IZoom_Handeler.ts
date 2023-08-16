import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";

export interface IZoom_Handeler
{
    zoom_by_direction(direction : number) : void;
    zoom_current_flow_by_factor(factor : number) : void;
    update_container_with_current_zoom(container: Container): void;
    update_unit_with_current_zoom(ligature : Ligature, container: Container): void;  
    zoom_by_direction_in_contious_async(direction: number) : Promise<void>;
    stop_zoom() : void;
}