import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Positions } from "../../use_cases/Zoom";

export interface IZoom_Handeler
{
    zoom_on_target_at_a_certain_ratio(abs_ratio: Matrix<4>, coordinates_and_ratio: Matrix<2>): void
    zoom(positions: IZoom_Positions[], factor: number): void;
    update_container_with_current_zoom(container: Container): void;
    update_unit_with_current_zoom(ligature : Ligature, container: Container): void; 
}