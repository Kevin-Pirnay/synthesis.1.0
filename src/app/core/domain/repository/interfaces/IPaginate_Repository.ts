import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { ISubtree_Root, View_As_Root_Handler } from "../../handlers/View_As_Root/View_As_Root_Handler";
import { IPaginate_Data } from "../../use_cases/View_Paginate";

export interface IPaginate_Repository
{
    get_paginate_dtos(indexes: number[]): IDto[];
    get_paginate_data(indexes: number[], root_point : Vector, view_as_root_handler : View_As_Root_Handler): IPaginate_Data 
    get_next_indexes(direction: number): number[];
    init_indexes(nb_idexes : number): number;
    store_subtrees_dtos(subtrees: ISubtree_Root[]): void; 
}