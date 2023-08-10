import { IContainer_Data_Flow } from './../runtime_memory/Runtime_Persistence';
import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Container implements IDao_Container
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public save_new_root(container: Container): void 
    {
        const new_flow = crypto.randomUUID();
        this.__runtime_persistence.flows.push(new_flow);
        this.__runtime_persistence.stack_flows.push(new_flow);
        container.root.push(new_flow);
        this.save_new_container(container);
    }

    public delete(container: Container): void 
    {
        //*** !!! overlap between dto !!! ***//
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const index = this.__runtime_persistence.containers_ids[current_flow].indexOf(container.id);
        this.__runtime_persistence.containers_ids[current_flow].splice(index, 1);
        delete this.__runtime_persistence.containers_fix[container.id];
        delete this.__runtime_persistence.containers_flow[container.id][current_flow];
    }

    public get_all(): Container[] // maybe there will be a problem with ligature since they may not be the same pointer once store and then retreive, so the reference in node will be wrong???
    {
        const result : Container[] = [];

        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        this.__runtime_persistence.containers_ids[current_flow].forEach((id : string) =>
        {
            result.push(this.__assemble_container(id));
        });

        return result;
    }

    public get_by_id(container_id: string): Container 
    {
        return this.__assemble_container(container_id);
    }

    public save_new_container(container : Container): void 
    {
        //*** !!! overlap between dto !!! ***//
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        if(!this.__runtime_persistence.containers_ids[current_flow])
        this.__runtime_persistence.containers_ids[current_flow] = []
        this.__runtime_persistence.containers_ids[current_flow].push(container.id);
        this.__runtime_persistence.containers_fix[container.id] = container;
        if(!this.__runtime_persistence.containers_flow[container.id])
            this.__runtime_persistence.containers_flow[container.id] = { };
        this.__runtime_persistence.containers_flow[container.id][current_flow] = { node : container.node, positions : container.positions };
    }

    public get_root_flow(): Container 
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        let result : Container | null = null;

        for(let data in this.__runtime_persistence.containers_fix)
        {
            const container_data = this.__runtime_persistence.containers_fix[data];
            if(container_data.root.includes(current_flow)) result = this.__assemble_container(container_data.id);
        }

        if(result == null) throw new Error("Enable to find the container root of this flow");
        return result;
    }

    private __assemble_container(container_id : string) : Container
    {
        //*** !!! overlap between dto !!! ***//
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const container : Container = this.__runtime_persistence.containers_fix[container_id];

        const flow_data : IContainer_Data_Flow = this.__runtime_persistence.containers_flow[container_id][current_flow];

        container.positions = flow_data.positions;

        container.node = flow_data.node;

        return container;
    }
}