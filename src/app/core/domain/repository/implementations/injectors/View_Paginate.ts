import { IDto } from "../../../../port/driver/dto/IDto";
import { View_Paginate_Response } from "../../../../port/driver/response/Response";
import { IView_As_Root_Handler } from "../../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Repository } from "../../interfaces/IRepository";
import { IView_Paginate } from "../../../use_cases/Paginate/View_Paginate";


export class View_Paginate implements IView_Paginate 
{
    private readonly __indexes: number[];
    private readonly __paginated_data: IPaginate_Data;
    private readonly __direction: number;
    private readonly __repository: IPaginate_Repository;

    constructor(
        paginate_repository: IPaginate_Repository,
        view_as_root_handler: IView_As_Root_Handler,
        direction: number
    ) {
        this.__indexes = paginate_repository.get_next_indexes(direction);
        this.__paginated_data = paginate_repository.get_paginate_data(this.__indexes, view_as_root_handler);
        this.__direction = direction;
        this.__repository = paginate_repository;
    }
    public rotate(): void 
    {
        this.__paginated_data.rotate(this.__direction);
    }

    public get_paginated_data_for_the_view(): View_Paginate_Response 
    {
        const dto: IDto[] = this.__repository.get_paginate_dtos(this.__indexes);

        return new View_Paginate_Response(dto);
    }
}

export interface IPaginate_Data 
{
    rotate(direction: number): void;
}

