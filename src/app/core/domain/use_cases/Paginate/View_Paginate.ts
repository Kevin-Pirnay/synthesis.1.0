import { View_Paginate_Request } from "../../../port/driver/request/request";
import { View_Paginate_Response } from "../../../port/driver/response/Response";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IPaginate_Repository } from "../../repository/interfaces/IRepository";
import { View_Paginate } from "../../repository/implementations/injectors/View_Paginate";


export class View_Paginate_Use_case
{
    constructor(private __paginate_repository: IPaginate_Repository, private __view_as_root_handler : IView_As_Root_Handler) { }
    
    public handle(request : View_Paginate_Request) : View_Paginate_Response
    {
        const view_paginate : IView_Paginate = View_Paginate.get_view_paginate_injector(this.__paginate_repository, this.__view_as_root_handler, request.direction);

        view_paginate.rotate();

        return view_paginate.get_paginated_data_for_the_view();
    }
}

export interface IView_Paginate
{
    rotate() : void;
    get_paginated_data_for_the_view() : View_Paginate_Response;
}

