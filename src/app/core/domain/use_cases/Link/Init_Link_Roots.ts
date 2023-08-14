import { IDto } from './../../../port/driver/dto/IDto';
import { ILink_Roots_Repository } from "../../repository/interfaces/ILink_Roots_Repository";
import { View_Link_Roots_Response } from '../../../port/driver/response/View_Link_Roots_Response';
import { Container } from '../../entities/Container';

export class Init_Link_Roots_Use_case
{
    constructor(private readonly __repository : ILink_Roots_Repository) { }
    
    public handle() : View_Link_Roots_Response
    {
        this.__repository.store_all_subtrees_root();

        const first_index : number = this.__repository.init_indexes();

        const link_roots : ILink_Roots = this.__repository.get_link_roots_data();

        const dtos : IDto[] = link_roots.anim([-1, first_index]);

        return new View_Link_Roots_Response(dtos);
    }
}

export interface ILink_Roots
{
    links_roots(container: Container): IDto[];
    anim(indexes: number[]): IDto[];
}