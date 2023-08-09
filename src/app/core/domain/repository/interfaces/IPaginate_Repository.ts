import { IDto } from "../../../port/driver/dto/IDto";
import { IPaginate_Data } from "../../use_cases/View_Paginate";

export interface IPaginate_Repository
{
    get_paginate_data(indexes: number[]): IPaginate_Data;
    get_next_indexes(direction: number): number[];
    init_indexes(nb_idexes : number): void;
    store_subtrees_dtos(result: IDto[][]): void; 
}