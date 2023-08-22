import { Vector } from "../../../../common/Vector/Vector";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";


export interface IZoom_Handler
{
    reinit_zoom_level(): unknown;
    get_current_zoom_fator() : number;
    get_current_unzoom_factor() :  number
    zoom_by_direction(direction : number) : void;
    zoom_current_flow_by_level(factor : number) : void;
    zoom_current_flow_by_level_toward_this_point(level: number, point : Vector<3>): void 
    zoom_on_a_point(point_to_zoom : Vector<3>, factor : number) : void
    update_container_with_current_zoom(container: Container): void;
    update_unit_with_current_zoom(ligature : Ligature, container: Container): void;  
    zoom_by_direction_in_contious_async(direction: number) : Promise<void>;
    stop_zoom() : void;
    get_alpha() : number;
    get_current_level() : number;
}