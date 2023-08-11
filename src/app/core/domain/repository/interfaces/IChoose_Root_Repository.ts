import { Container } from "../../entities/Container";
import { IMove_View_Handler } from "../../handlers/Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "../../handlers/Zoom/IZoom_Handeler";
import { IChoose_Root_Container } from "../../use_cases/Choose_Root";

export interface IChoose_Root_Repository
{
    get_choose_root_container(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IChoose_Root_Container;

}