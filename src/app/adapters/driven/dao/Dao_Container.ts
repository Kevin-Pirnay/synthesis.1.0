import { IContainer_Data_Flow } from './../runtime_memory/Runtime_Persistence';
import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { IContainer_Data_Fix, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Container implements IDao_Container
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public save_root(container: Container): void 
    {
        const new_flow = crypto.randomUUID();
        //throw new Error("Method not implemented.");
    }

    public delete(container: Container): void 
    {
        delete this.__runtime_persistence.containers[container.id];
    }

    public get_all(): Container[] 
    {
        const result : Container[] = [];

        this.__runtime_persistence.containers_ids.forEach((id : string) =>
        {
            result.push(this.__assemble_container(id));
        });

        return result;
    }

    public save(container : Container): void 
    {
        this.__runtime_persistence.containers[container.id] = container;
    }

    private __assemble_container(container_id : string) : Container
    {
        const container = new Container(container_id);

        const fix_data : IContainer_Data_Fix = this.__runtime_persistence.containers_fix[container_id];

        container.root = fix_data.root;

        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const flow_data : IContainer_Data_Flow = this.__runtime_persistence.containers_flow[container_id][current_flow];

        container.positions = flow_data.positions;

        container.node = flow_data.node;

        return container;
    }
}