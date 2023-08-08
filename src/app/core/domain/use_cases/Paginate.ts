import { Paginate_Request } from "../../port/driver/request/Paginate_request";
import { Paginate_Response } from "../../port/driver/response/Paginate_Response";
import { IPaginate_Repository } from "../repository/interfaces/IPaginate_Repository";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";
import { ISubtree_Data } from "./View_As_Root";

export class Paginate_Use_case
{
    constructor(
        private readonly __paginate_repository : IPaginate_Repository,
        private readonly __view_as_root_repository : IView_As_Root_Repository
    ) { }
    
    public handle(request : Paginate_Request) : Paginate_Response
    {
        const subTrees_data : ISubtree_Data[] = [];
    }
}