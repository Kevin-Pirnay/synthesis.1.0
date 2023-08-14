import { Container } from './../../entities/Container';
import { IView_As_Root_Repository } from './../../repository/interfaces/IView_As_Root_Repository';
import { IDto } from './../../../port/driver/dto/IDto';
import { IView_As_Root_Handler } from './../../handlers/View_As_Root/IView_As_Root_Handler';
import { Select_Link_Roots_Request } from "../../../port/driver/request/Select_Link_Roots_Request";
import { Select_Link_Roots_Response } from "../../../port/driver/response/Select_Link_Roots_Response";
import { ILink_Roots_Repository } from "../../repository/interfaces/ILink_Roots_Repository";
import { ISubtree_Root } from '../../handlers/View_As_Root/View_As_Root_Handler';
import { Vector } from '../../../common/Vector/Vector';
import { ILink_Roots } from './Init_Link_Roots';

export class Select_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
    ) { }

    public handle(request : Select_Link_Roots_Request) : Select_Link_Roots_Response
    {
        const link_roots : ILink_Roots = this.__repository.get_link_roots_data();

        const dtos : IDto[] = link_roots.links_roots(request.container);
     
        return new Select_Link_Roots_Response(dtos);
    }
}