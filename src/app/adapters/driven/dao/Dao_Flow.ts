
import { Ptr } from "../../../core/common/Ptr";
import { IDao_Flow } from "../../../core/port/driven/dao/IDao_Flow";
import { Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Flow implements IDao_Flow
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public change_current_flow(flow: string): void 
    {        
        this.__current_flow._ = flow;
    }

    public get_all_flows(): string[] 
    {
        return this.__persistence.flows_ids;
    }

    public get_current_flow(): string
    {
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        return this.__current_flow._;
    }

    public get_all_flows_related_to_the_current_flow(flow_id : string) : string[]
    {
        const result : string[] = [];

        const current_flow : Flow = this.__persistence.flows[flow_id];

        if(current_flow.parent) result.push(current_flow.parent);

        current_flow.children.forEach((flow : string) => result.push(flow));

        return result;
    }
}