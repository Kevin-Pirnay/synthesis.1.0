import { IDto } from "../../../port/driver/dto/IDto";
import { Choose_Root_Request } from "../../../port/driver/request/request";
import { Choose_Root_Response } from "../../../port/driver/response/Response";
import { IMove_View_Handler } from "../../handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { IChoose_Root_Repository } from "../../repository/interfaces/IRepository";


export class Init_Choose_Root_Use_case
{
    constructor(
        private readonly __choose_repository : IChoose_Root_Repository, 
        private readonly __zoom_handler : IZoom_Handler, 
        private readonly __move_view_handler : IMove_View_Handler
    ) { }
    
    public async handle(request : Choose_Root_Request) : Promise<Choose_Root_Response>
    {
        this.__choose_repository.store_all_possible_roots(request.container);

        const first_index : number = this.__choose_repository.init_indexes_of_roots_to_choose();

        const choose_root_container : IChoose_Roots_Container = this.__choose_repository.get_choose_root_container(request.container, this.__zoom_handler, this.__move_view_handler);

        await choose_root_container.zoom_and_place_itself_at_the_bottom();

        const choose_roots_data : IChoose_Roots_Root = this.__choose_repository.get_choose_root_roots([-1, first_index]);

        choose_roots_data.animate_first_root_to_choose();

        const dto : IDto = choose_roots_data.get_the_first_root_dto();

        return new Choose_Root_Response([dto]);
    }
}

export interface IChoose_Roots_Container
{
    zoom_and_place_itself_at_the_bottom() : Promise<void> ;
} 

export interface IChoose_Roots_Root
{
    get_dtos(indexes : number[]): IDto[];
    rotate(direction: number): void;
    get_the_first_root_dto(): IDto;
    animate_first_root_to_choose(): void;
}