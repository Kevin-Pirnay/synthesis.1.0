import { Container } from "../../entities/Container";

export interface IChange_Root_Repository
{
    change_current_flow(flow: string): void;
    get_root_container(): Container;
    get_current_flow(): string;
    get_all_flows(): string[];
}