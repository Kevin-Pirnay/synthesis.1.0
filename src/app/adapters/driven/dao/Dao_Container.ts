import { IContainer_Data_Flow } from './../runtime_memory/Runtime_Persistence';
import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";
import { Flow } from '../../../core/domain/entities/Flow';

export class Dao_Container implements IDao_Container
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence, private readonly __current_flow : Flow) { }

    public save_new_root(container: Container): void 
    {
        const new_flow = crypto.randomUUID();
        container.roots.push(new_flow);
        if(this.__current_flow._.length) container.roots.push(this.__current_flow._); //use to come back to the previous flow
        this.__update_the_current_flow(new_flow);
        this.save_new_container(container);
    }

    private __update_the_current_flow(flow : string) : void
    {
        this.__runtime_persistence.flows.push(flow);
        this.__runtime_persistence.stack_flows.push(flow);
        this.__current_flow._ = flow;
    }

    public delete(container: Container): void 
    {
        const index = this.__runtime_persistence.containers_ids[this.__current_flow._].indexOf(container.id);
        this.__runtime_persistence.containers_ids[this.__current_flow._].splice(index, 1);
        delete this.__runtime_persistence.containers_fix[container.id];
        delete this.__runtime_persistence.containers_flow[container.id][this.__current_flow._];
    }

    public get_all(): Container[]
    {
        const result : Container[] = [];

        this.__runtime_persistence.containers_ids[this.__current_flow._].forEach((id : string) =>
        {
            result.push(this.__assemble_container(id));
        });

        return result;
    }

    public update_all_ptr_to_the_current_flow(): void 
    {
        const containers_ids : string[] = this.__runtime_persistence.containers_ids[this.__current_flow._];

        containers_ids.forEach(id =>
        {
            this.__assemble_container(id);
        });
    }

    public get_by_id(container_id: string): Container 
    {
        return this.__assemble_container(container_id);
    }

    public save_new_container(container : Container): void 
    {
        if(!this.__runtime_persistence.containers_ids[this.__current_flow._])
            this.__runtime_persistence.containers_ids[this.__current_flow._] = []
        this.__runtime_persistence.containers_ids[this.__current_flow._].push(container.id);
        this.__runtime_persistence.containers_fix[container.id] = container;
        if(!this.__runtime_persistence.containers_flow[container.id])
            this.__runtime_persistence.containers_flow[container.id] = { };
        this.__runtime_persistence.containers_flow[container.id][this.__current_flow._] = { node : container.node, positions : container.positions };
    }

    public get_root_flow(): Container 
    {
        let result : Container | null = null;

        for(let data in this.__runtime_persistence.containers_fix)
        {
            const container_data = this.__runtime_persistence.containers_fix[data];
            //need to be the first id
            if(container_data.roots[0] == this.__current_flow._) result = this.__assemble_container(container_data.id);
        }

        if(result == null) throw new Error("Enable to find the container root of this flow");

        return result;
    }

    private __assemble_container(container_id : string) : Container
    {
        const container : Container = this.__runtime_persistence.containers_fix[container_id];

        const flow_data : IContainer_Data_Flow = this.__runtime_persistence.containers_flow[container_id][this.__current_flow._];

        container.positions = flow_data.positions;

        container.node = flow_data.node;

        return container;
    }
}