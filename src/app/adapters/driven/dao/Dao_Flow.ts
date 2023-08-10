import { IDao_Flow } from "../../../core/port/driven/dao/IDao_Flow";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Flow implements IDao_Flow
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public change_current_flow(flow: string): void 
    {
        //*** change that ***
        this.__runtime_persistence.stack_flows.push(flow);
    }

    public get_all_flows(): string[] 
    {
        return this.__runtime_persistence.flows;
    }

    public get_current_flow(): string
    {
        return this.__runtime_persistence.stack_flows.slice(-1)[0];
    }

}