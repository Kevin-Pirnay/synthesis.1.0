import { Matrix } from "../../../common/Matrix/Matrix";
import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IMove_View_Positions } from "../../handlers/handlers_use_case/Move_View/Move_View_Handler";
import { Ptr_Boolean } from '../../../common/Ptr_Boolean';
import { IZoom_Positions } from "../../handlers/handlers_use_case/Zoom/Zoom_Handler";
import { IRemove_Container } from "../../use_cases/Delete_Container";
import { Vector } from "../../../common/Vector/Vector";
import { ISubtree_Root } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IDto } from "../../../port/driver/dto/IDto";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Data } from "../implementations/injectors/View_Paginate";
import { IMove_View_Handler } from "../../handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { IChoose_Roots_Root, IChoose_Roots_Container } from "../../use_cases/Choose_Root/Init_Choose_Root";
import { IZoom_Handler } from "../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";


export interface ICreate_Repository 
{
    get_default_container_rel_ratio(): Matrix<4>;
    save_root(container: Container): void;
    save_unit(ligature: Ligature, container: Container): void;
}


export interface IDelete_Container_Repository
{
    get_remove_container(container: Container, node_linker_handler: INode_Linker): IRemove_Container;
    delete_unit_from_memory(unit_to_remove: Unit_Node): void;
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
    update_zoom_level(level : number) : number;
    get_zoom_factor() : number;
    get_unzoom_factor() : number;
    get_current_level() : number;
    get_alpha() : number;
}


export interface IView_As_Root_Repository
{
    get_subtree_root_by_id(container_id: string): ISubtree_Root;
    get_default_position_of_the_root(): Vector;
    get_subtree_root(container: Container): ISubtree_Root;
}


export interface IMark_As_Root_Repository
{
    get_default_position_of_the_root(): Vector;
    save_the_new_root(container: Container): void;
    get_mark_as_root_data(container: Container): IMark_As_Root;
}


export interface IPaginate_Repository
{
    get_paginate_dtos(indexes: number[]): IDto[];
    get_paginate_data(indexes: number[], view_as_root_handler : IView_As_Root_Handler): IPaginate_Data
    get_next_indexes(direction: number): number[];
    init_indexes(nb_idexes : number): number;
    store_subtrees_roots(subtrees_root: ISubtree_Root[]): void; 
}


export interface IChoose_Root_Repository
{
    get_next_indexes(direction: number): number[];
    init_indexes_of_roots_to_choose(nb_indexes : number): number;
    store_all_possible_roots(roots : string[]): void;
    get_choose_root_container(container : Container, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler): IChoose_Roots_Container;
    get_choose_root_roots(indexes : number[]): IChoose_Roots_Root;
}


export interface IChange_Root_Repository
{
    change_current_flow(flow: string): void;
    get_root_container_from_the_current_flow() : Container;
}


export interface ILink_Roots_Repository
{
    get_link_roots_data(indexes: number[]): ILink_Roots;
    init_indexes(): number;
    store_all_subtrees_root(): void;
}
