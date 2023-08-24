
export interface IDao_Flow
{
    change_current_flow(flow: string): void;
    get_all_flows() : string[];
    get_current_flow() : string;
    get_all_flows_related_to_the_current_flow(flow_id : string) : string[];
}