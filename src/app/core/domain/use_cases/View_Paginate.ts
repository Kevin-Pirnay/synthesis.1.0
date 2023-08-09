import { Vector } from "../../common/Vector/Vector";
import { IDto } from "../../port/driver/dto/IDto";
import { View_Paginate_Request } from "../../port/driver/request/View_Paginate_Request";
import { View_Paginate_Response } from "../../port/driver/response/View_Paginate_Response";
import { View_As_Root_Handler } from "../handlers/View_As_Root/View_As_Root_Handler";
import { View_As_Root_Repository } from "../repository/implementations/View_As_Root_Repository";
import { IPaginate_Repository } from "../repository/interfaces/IPaginate_Repository";

export class View_Paginate_Use_case
{
    constructor(private __paginate_repository: IPaginate_Repository, private __view_as_root_repository : View_As_Root_Repository, private __view_as_root_handler : View_As_Root_Handler) { }
    
    public handle(request : View_Paginate_Request) : View_Paginate_Response
    {
        const indexes : number[] = this.__paginate_repository.get_next_indexes(request.direction);
        const root_point : Vector = this.__view_as_root_repository.get_default_root_pos();
        const data : IPaginate_Data = this.__paginate_repository.get_paginate_data(indexes, root_point, this.__view_as_root_handler);
        data.rotate(request.direction);
        const dto : IDto[] =  this.__paginate_repository.get_paginate_dtos(indexes);
        return new View_Paginate_Response(dto);
    }
}

export interface IPaginate_Data
{
    rotate(direction : number) : void;
}