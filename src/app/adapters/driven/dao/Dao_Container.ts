import { IContainer_Data_Flow } from './../runtime_memory/Runtime_Persistence';
import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { IContainer_Data_Fix, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

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
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];
        const index = this.__runtime_persistence.containers_ids.indexOf(container.id);
        this.__runtime_persistence.containers_ids.splice(index, 1);
        delete this.__runtime_persistence.containers_fix[container.id];
        delete this.__runtime_persistence.containers_flow[container.id][current_flow];
    }

    public get_all(): Container[] // maybe there will be a problem with ligature since they may not be the same pointer once store and then retreive, so the reference in node will be wrong???
    {
        const result : Container[] = [];

        this.__runtime_persistence.containers_ids.forEach((id : string) =>
        {
            result.push(this.__assemble_container(id));
        });

        return result;
    }

    public save_new_container(container : Container): void 
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        this.__runtime_persistence.containers_ids.push(container.id);
        this.__runtime_persistence.containers_fix[container.id] = { id: container.id, root : container.root }
        this.__runtime_persistence.containers_flow[container.id] = { };
        this.__runtime_persistence.containers_flow[container.id][current_flow] = { node : container.node, positions : container.positions };
    }

    private __assemble_container(container_id : string) : Container
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const container = new Container(container_id);

        const fix_data : IContainer_Data_Fix = this.__runtime_persistence.containers_fix[container_id];

        fix_data.root.forEach(root => container.root.push(root));

        const flow_data : IContainer_Data_Flow = this.__runtime_persistence.containers_flow[container_id][current_flow];

        container.positions = flow_data.positions;

        container.node = flow_data.node;

        return container;
    }
}