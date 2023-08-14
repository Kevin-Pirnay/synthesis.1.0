import { Link_Project_Request } from "../../../port/driver/request/Link_Project_Request";
import { IMove_View_Handler } from "../../handlers/Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "../../handlers/Zoom/IZoom_Handeler";
import { ILink_Project_Repository } from "../../repository/interfaces/ILink_Project_Repository";

export class Link_Project_Use_case
{
    constructor(
        private readonly __repostory : ILink_Project_Repository,
        private readonly __zoom_hanler : IZoom_Handeler,
        private readonly __move_view_handler : IMove_View_Handler
    ) { }

    public handle(request : Link_Project_Request) : void
    {
        const projects : IAnimate_Projects = this.__repostory.get_animate_projects(this.__zoom_hanler, this.__move_view_handler);

        projects.animate();
    }
}

export interface IAnimate_Projects
{
    animate() : void
}