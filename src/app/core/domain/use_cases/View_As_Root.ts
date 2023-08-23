import { IDto } from '../../port/driver/dto/IDto';
import { View_As_Root_Request } from '../../port/driver/request/request';
import { View_As_Root_Response } from '../../port/driver/response/Response';
import { IData_Tree } from '../handlers/handlers_use_case/View_As_Root/IData_Tree';
import { IView_As_Root_Handler } from '../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';


export class View_As_Root_Use_case
{
    constructor(private __handler : IView_As_Root_Handler) { }
    
    public handle(request : View_As_Root_Request) : View_As_Root_Response
    {
        const result : IData_Tree[] = this.__handler.get_subtree_from_this_container(request.container);

        const dtos : IDto[] = result;

        return new View_As_Root_Response(dtos);
    }
}