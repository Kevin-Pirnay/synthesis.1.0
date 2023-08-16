import { Matrix } from "../../../common/Matrix/Matrix";
import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IMove_View_Positions } from "../../handlers/handlers_use_case/Move_View/Move_View_Handler";
import { Ptr_Boolean } from '../../../common/Ptr_Boolean';
import { IZoom_Positions } from "../../handlers/handlers_use_case/Zoom/Zoom_Handeler";
import { IRemove_Container } from "../../use_cases/Delete_Container";


export interface ICreate_Repository 
{
    get_default_container_rel_ratio(): Matrix<4>;
    save_root(container: Container): void;
    save_unit(ligature: Ligature, container: Container): void;
}


export interface IDelete_Container_Repository
{
    get_remove_container(container: Container, node_linker_handler: INode_Linker): IRemove_Container;
    delete_unit_from_memory(unit_to_remove: Unit_Node): unknown;
}


export interface IMove_View_Repository
{
    init_stop_move_view_condition(): Ptr_Boolean;
    get_all_move_views_positions(): IMove_View_Positions[];
    set_stop_move_view_condition_to(value : boolean) : void
}


export interface IZoom_Repository
{
    set_stop_zoom_condition_to(arg0: boolean): void;
    init_stop_zoom_condition(): Ptr_Boolean;
    get_all_zooms_positions(): IZoom_Positions[];
    update_zoom_factor(direction: number): number;
    get_zoom_factor() : number;
    get_unzoom_factor() : number;
}
