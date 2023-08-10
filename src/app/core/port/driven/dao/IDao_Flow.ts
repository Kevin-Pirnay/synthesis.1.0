
export interface IDao_Flow
{
    change_current_flow(flow: string): void;
    get_all_flows(): string[];
    get_current_flow() : string;
}