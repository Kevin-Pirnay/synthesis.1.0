import { IDto } from "../../port/driver/dto/IDto";
import { View_Paginate_Request } from "../../port/driver/request/View_Paginate_Request";
import { View_Paginate_Response } from "../../port/driver/response/View_Paginate_Response";
import { IPaginate_Repository } from "../repository/interfaces/IPaginate_Repository";

export class View_Paginate_Use_case
{
    constructor(private __paginate_repository: IPaginate_Repository) { }
    
    public handle(request : View_Paginate_Request) : View_Paginate_Response
    {
        const indexes : number[] = this.__paginate_repository.get_next_indexes(request.direction);
        const data : IPaginate_Data = this.__paginate_repository.get_paginate_data(indexes);
        data.set_in_place(request.direction);
        data.rotate(request.direction);
        const dto : IDto[] =  this.__paginate_repository.get_paginate_dtos(indexes);
        return new View_Paginate_Response(dto);
    }
}

export interface IPaginate_Data
{
    set_in_place(direction : number) : void;
    rotate(direction : number) : void;
}