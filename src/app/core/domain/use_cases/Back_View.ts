import { IDto } from '../../port/driver/dto/IDto';
import { Vector } from "../../common/Vector/Vector";
import { IView_As_Root_Handler } from "../handlers/View_As_Root/IView_As_Root_Handler";
import { ISubtree_Root } from "../handlers/View_As_Root/View_As_Root_Handler";
import { IView_As_Root_Repository } from "../repository/interfaces/IView_As_Root_Repository";
import { Back_View_Request } from '../../port/driver/request/Back_View_Request';
import { Back_View_Response } from '../../port/driver/response/Back_View';

export class Back_View_Use_case
{
    constructor(
        private __repository : IView_As_Root_Repository,
        private __handler : IView_As_Root_Handler
    ) { }

    public handle(request : Back_View_Request) : Back_View_Response
    {
        const root_position : Vector = this.__repository.get_default_position_of_the_root();

        const root_data : ISubtree_Root = this.__repository.get_root_subtree_by_id(request.container_id);

        const dtos : IDto[] = this.__handler.get_subtree_dtos(root_data, root_position);

        return new Back_View_Response(dtos);
    }
}