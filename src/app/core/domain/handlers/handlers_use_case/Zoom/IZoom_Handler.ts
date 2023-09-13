import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { IData_Tree } from "../View_As_Root/IData_Tree";


export interface IZoom_Handler
{
    reinit_zoom_level(): unknown;
    get_current_zoom_fator() : number;
    get_current_unzoom_factor() :  number
    zoom_by_direction(direction : number) : void;
    zoom_current_flow_by_level(level : number) : void;
    zoom_current_flow_by_factor(factor : number) : void;
    zoom_current_flow_by_factor_from_the_current_factor(factor: number): void;
    zoom_current_flow_by_level_toward_this_point(level: number, point : Vector<3>): void;
    zoom_current_data_tree_to_the_current_factor(data : IData_Tree[]) : void;
    zoom_on_a_point(point_to_zoom : Vector<3>, factor : number) : void
    update_this_ratio_with_the_current_zoom(ratio : Matrix<any>) : Matrix<any> 
    zoom_by_direction_in_contious_async(direction: number) : Promise<void>;
    stop_zoom() : void;
    get_alpha() : number;
    get_current_level() : number;
}