import { View_Link_Roots_Response } from '../../../port/driver/response/Response';
import { IView_As_Root_Handler } from '../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';
import { ILink_Roots_Repository } from '../../repository/interfaces/IRepository';
import { IDto } from './../../../port/driver/dto/IDto';


export class Init_Link_Roots_Use_case
{
    constructor(private readonly __repository : ILink_Roots_Repository, private readonly __handler : IView_As_Root_Handler) { }
    
    public handle() : View_Link_Roots_Response
    {
        this.__repository.store_all_subtrees_root();

        const first_index : number = this.__repository.init_indexes();

        const link_roots : ILink_Roots = this.__repository.get_link_roots_data([-1, first_index], this.__handler);

        const dtos : IDto[] = link_roots.anim();

        return new View_Link_Roots_Response(dtos);
    }
}

export interface ILink_Roots
{
    anim(): IDto[];
}