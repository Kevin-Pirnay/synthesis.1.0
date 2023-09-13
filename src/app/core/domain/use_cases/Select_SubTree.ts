import { Select_SubTree_Request } from "../../port/driver/request/request";
import { Select_SubTree_Response } from "../../port/driver/response/Response";
import { Container } from "../entities/Container";
import { Data_Type } from "../entities/Data_Type";
import { IData_Tree } from "../handlers/handlers_use_case/View_As_Root/IData_Tree";
import { IView_As_Root_Handler } from "../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";

export class Select_Subtree_Use_case
{
    constructor(private readonly __handler : IView_As_Root_Handler) { }

    public handle(request : Select_SubTree_Request) : Select_SubTree_Response
    {
        const data_tree : IData_Tree[] = this.__handler.get_subtree_from_this_container(request.container);

        const result : Container[] = data_tree.filter(data => data.type = Data_Type.CONTAINER).map(data => data.element);

        return new Select_SubTree_Response(result);
    }
}