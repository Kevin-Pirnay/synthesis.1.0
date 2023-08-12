import { IMove_View_Handler } from "../../handlers/Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "../../handlers/Zoom/IZoom_Handeler";
import { IAnimate_Projects } from "../../use_cases/Link_Project";

export interface ILink_Project_Repository
{
    get_animate_projects(zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IAnimate_Projects;
    
}