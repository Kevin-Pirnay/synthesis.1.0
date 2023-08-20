import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";


export interface IZoom_Handler
{
    get_current_zoom_fator() : number;
    get_current_unzoom_factor() :  number
    zoom_by_direction(direction : number) : void;
    zoom_current_flow_by_level(factor : number) : void;
    update_container_with_current_zoom(container: Container): void;
    update_unit_with_current_zoom(ligature : Ligature, container: Container): void;  
    zoom_by_direction_in_contious_async(direction: number) : Promise<void>;
    stop_zoom() : void;
    get_alpha() : number;
    get_current_level() : number;
}