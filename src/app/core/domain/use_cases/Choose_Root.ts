import { IDto } from "../../port/driver/dto/IDto";
import { Choose_Root_Request } from "../../port/driver/request/Choose_Root_Request";
import { Choose_Root_Response } from "../../port/driver/response/Choose_Root_Response";
import { IMove_View_Handler } from "../handlers/Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "../handlers/Zoom/IZoom_Handeler";
import { IChoose_Root_Repository } from "../repository/interfaces/IChoose_Root_Repository";

export class Choose_Root_Use_case
{
    constructor(private readonly __choose_repository : IChoose_Root_Repository, private readonly __zoom_handler : IZoom_Handeler, private readonly __move_view_handler : IMove_View_Handler) { }
    
    public handle(request : Choose_Root_Request) : Choose_Root_Response
    {
        const choose_root_container : IChoose_Root_Container = this.__choose_repository.get_choose_root_container(request.container, this.__zoom_handler, this.__move_view_handler);

        choose_root_container.zoom_and_place_itself_at_the_bottom();

        const dto = choose_root_container.animate_root_to_choose();

        return new Choose_Root_Response([dto]);
    }
}

export interface IChoose_Root_Container
{
    zoom_and_place_itself_at_the_bottom() : void;

    animate_root_to_choose() : IDto;

    show_next_root_to_choose() : void;
} 