import { IDto } from "../../../port/driver/dto/IDto";

export interface IPaginate_Repository
{
    init_indexes(): void;
    store_subtrees_dtos(result: IDto[][]): void; 
}