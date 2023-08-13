import { Container } from "../../entities/Container";
import { IMove_View_Handler } from "../../handlers/Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "../../handlers/Zoom/IZoom_Handeler";
import { IChoose_Root_Container, IChoose_Root_Roots } from "../../use_cases/Init_Choose_Root";

export interface IChoose_Root_Repository
{
    get_next_indexes(direction: number): number[];
    get_choose_root_roots(indexes : number[]): IChoose_Root_Roots;
    init_indexes_of_roots_to_choose(nb_indexes : number): number;
    store_all_possible_roots(roots : string[]): void;
    get_choose_root_container(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IChoose_Root_Container;

}