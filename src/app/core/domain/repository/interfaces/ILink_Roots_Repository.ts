import { IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";

export interface ILink_Roots_Repository
{
    links_roots(container: Container): IDto[];
    get_next_indexes(direction: number): number[];
    get_link_roots_data(indexes: number[]): ILink_Roots;
    init_indexes(): number;
    store_all_subtrees_root(): void;
}