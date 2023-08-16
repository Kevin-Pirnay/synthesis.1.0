// import { IMove_View_Handler } from "../../handlers/Move_View/IMove_View_Handler";
// import { IZoom_Handeler } from "../../handlers/Zoom/IZoom_Handeler";
// import { IAnimate_Projects } from "../../use_cases/Link/Link_Project";
// import { ILink_Project_Repository } from "../interfaces/ILink_Project_Repository";


// export class Link_Project_Repository implements ILink_Project_Repository 
// {
//     constructor() { }

//     public get_animate_projects(zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IAnimate_Projects 
//     {
//         return new Animate_Projects(zoom_handler, move_view_handler);
//     }
// }

// class Animate_Projects implements IAnimate_Projects
// {
//     private readonly __unzoom_handler : IUnzoom_Project;
//     private readonly __rotate_handler : IRotate_Project;

//     constructor(zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler) 
//     { 
//         this.__unzoom_handler = new Unzoom_Project(zoom_handler);
//         this.__rotate_handler = new Rotate_Project(move_view_handler);
//     }

//     public animate(): void 
//     {
//         this.__unzoom_handler.unzoom();
//         this.__rotate_handler.rotate();
//     }
// }

// interface IUnzoom_Project
// {
//     unzoom() : void;
// }

// interface IRotate_Project
// {
//     rotate() : void;
// }

// class Unzoom_Project implements IUnzoom_Project
// {
//     constructor(private readonly __zoom_handler : IZoom_Handeler) { }

//     public unzoom(): void 
//     {
//         this.__zoom_handler.zoom_current_flow_by_factor(0.5);
//     }
// }

// class Rotate_Project implements IRotate_Project
// {
//     constructor(private readonly __move_view_handler : IMove_View_Handler) { }

//     public rotate(): void 
//     {
//         this.__move_view_handler.rotate_current_project(90, 1, 1, 0.8);
//     }
// }
