import { IDto } from "../../port/driver/dto/IDto";
import { View_Paginate_Request } from "../../port/driver/request/View_Paginate_Request";
import { View_Paginate_Response } from "../../port/driver/response/View_Paginate_Response";
import { IView_As_Root_Handler } from "../handlers/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Repository } from "../repository/interfaces/IPaginate_Repository";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";

export class View_Paginate_Use_case
{
    constructor(private __paginate_repository: IPaginate_Repository, private __view_as_root_repository : IView_As_Root_Repository, private __view_as_root_handler : IView_As_Root_Handler) { }
    
    public handle(request : View_Paginate_Request) : View_Paginate_Response
    {
        const view_paginate : IView_Paginate = new View_Paginate(this.__paginate_repository, this.__view_as_root_repository, this.__view_as_root_handler, request.direction);

        view_paginate.rotate();

        return view_paginate.get_data_paginated_dtos_for_the_view();
    }
}

export interface IPaginate_Data
{
    rotate(direction : number) : void;
}

interface IView_Paginate
{
    rotate() : void;
    get_data_paginated_dtos_for_the_view() : View_Paginate_Response;
}

class View_Paginate implements IView_Paginate
{   
    private readonly __indexes : number[];
    private readonly __data : IPaginate_Data;
    private readonly __direction : number;
    private readonly __repository : IPaginate_Repository

    constructor(
        paginate_repository: IPaginate_Repository,
        view_as_root_repository : IView_As_Root_Repository,
        view_as_root_handler : IView_As_Root_Handler,
        direction : number)
    {
        this.__indexes = paginate_repository.get_next_indexes(direction);
        const root_point = view_as_root_repository.get_default_position_of_the_root();
        this.__data = paginate_repository.get_paginate_data(this.__indexes, root_point, view_as_root_handler);
        this.__direction = direction;
        this.__repository = paginate_repository;
    }
    public rotate(): void 
    {
        this.__data.rotate(this.__direction);
    }

    public get_data_paginated_dtos_for_the_view() : View_Paginate_Response
    {
        const dto : IDto[] =  this.__repository.get_paginate_dtos(this.__indexes);

        return new View_Paginate_Response(dto);
    }
}