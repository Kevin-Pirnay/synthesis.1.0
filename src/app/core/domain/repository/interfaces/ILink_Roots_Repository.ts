import { Container } from "../../entities/Container";
import { ILink_Roots } from "../../use_cases/Link/Init_Link_Roots";

export interface ILink_Roots_Repository
{
    link_roots(container: Container): Container;
    get_next_indexes(direction: number): number[];
    get_link_roots_data(): ILink_Roots;
    init_indexes(): number;
    store_all_subtrees_root(): void;
}