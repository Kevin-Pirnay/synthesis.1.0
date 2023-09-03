import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { Flow, IContainer_Data_Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";
import { Vector } from '../../../core/common/Vector/Vector';
import { Matrix } from '../../../core/common/Matrix/Matrix';
import { Vector_ } from '../../../core/common/Vector/Vector_';
import { Ptr } from "../../../core/common/Ptr";


export class Dao_Container implements IDao_Container
{
    private readonly __flow_handler : Save_Flow_Handler;
    private readonly __container_handler : Save_Container_Handler;
    private readonly __delete_handler : Delete_Container_Handler;
    private readonly __get_handler : Get_Container_Handler;

    constructor(runtime_persistence : Runtime_Persistence, current_flow : Ptr<string>) 
    { 
        this.__flow_handler = new Save_Flow_Handler(runtime_persistence, current_flow);
        this.__container_handler = new Save_Container_Handler(runtime_persistence, current_flow);
        this.__delete_handler = new Delete_Container_Handler(runtime_persistence, current_flow);
        this.__get_handler = new Get_Container_Handler(runtime_persistence, current_flow);
    }

    public save_the_new_root(container: Container): void 
    {
        const new_flow_id = crypto.randomUUID();

        this.__flow_handler.add_the_new_flow_to_the_root_container(container, new_flow_id);

        this.__flow_handler.save_and_update_the_current_flow_with(new_flow_id);

        this.save_the_new_container(container);
    }

    public save_the_new_container(container : Container): void 
    {
        this.__container_handler.save_id_into_the_containers_ids(container.id);

        this.__container_handler.save_data_not_related_to_the_flow(container);

        this.__container_handler.save_data_related_to_the_flow(container);
    }

    public save_the_container_into_this_flow(container: Container, flow: string): void 
    {
        this.__container_handler.save_the_container_into_this_flow(container, flow);
    }

    public delete_container(container: Container): void 
    {
        this.__delete_handler.delete(container);
    }

    public get_all_containers_of_the_current_flow(): Container[] 
    {
        return this.__get_handler.get_all_containers_of_the_current_flow();
    }

    public get_default_position_of_the_root() : Vector<3> 
    {
        return this.__get_handler.get_default_position_of_the_root();
    }

    public get_container_by_id_for_the_current_flow(container_id: string): Container 
    {
       return this.__get_handler.get_container_by_id_for_the_current_flow(container_id);
    }

    prepare_all_ptr_for_the_current_flow(): void 
    {
        this.__get_handler.prepare_all_ptr_for_the_current_flow();
    }

    get_root_container_of_the_current_flow(): Container 
    {
        return this.__get_handler.get_root_container_of_the_current_flow();
    }

    public get_root_container_of_this_flow(flow: string): Container 
    {
        return this.__get_handler.get_root_container_of_this_flow(flow); 
    }

    public get_default_rel_ratio(): Matrix<4> 
    {
        return this.__get_handler.get_default_ratio();
    }
}

class Save_Flow_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public save_and_update_the_current_flow_with(flow_id : string) : void
    {
        const new_flow : Flow = this.__create_a_new_flow(flow_id);

        this.__persistence.flows[flow_id] = new_flow;

        this.__persistence.flows_ids.push(flow_id);

        this.__current_flow._ = flow_id;
    }

    private __create_a_new_flow(flow_id : string) : Flow
    {
        const new_flow : Flow = new Flow(flow_id);

        new_flow.parent = this.__current_flow._;

        if(this.__current_flow._ == null) return new_flow;

        const parent_flow : Flow = this.__persistence.flows[this.__current_flow._];

        parent_flow.children.push(flow_id);

        return new_flow
    }

    public add_the_new_flow_to_the_root_container(container : Container, new_flow : string) : void
    {
        container.roots.push(new_flow);

        /**
         * In order to keep track of its previous flow, if this is not the first root of this project, set the back root. 
         * If this is the first root of the project, the flow will be of length 0.
         **/
        if ( this.__current_flow._ !== null ) container.back_root = this.__current_flow._;
    }
}

class Save_Container_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public save_id_into_the_containers_ids(container_id : string) : void 
    {
        const containers_ids : {[flow: string]: string[]} = this.__persistence.containers_ids;

        const current_flow : string | null = this.__current_flow._;

        if ( current_flow == null ) throw new Error("No flow has been set");

        //init if not exist
        if ( !containers_ids[current_flow] ) containers_ids[current_flow] = [];

        //save
        if ( containers_ids[current_flow].find(id => id == container_id) ) return;
        
        containers_ids[current_flow].push(container_id);
    }

    /**
     * save data not related to the flow
     * save the ptr of the container that will serve as a reference in the entire application
     **/
    public save_data_not_related_to_the_flow(container : Container) : void
    {
        const fix_data_persistence =  this.__persistence.containers_data_fix;
        
        fix_data_persistence[container.id] = container;
    }

    /**
     * save data related to the flow
     * save ptrs of data that will change according to the flow in order to plug them to the fix data ptr
     **/
    public save_data_related_to_the_flow(container : Container) : void
    {
        const flow_data_persistence = this.__persistence.containers_data_flow;

        //init if not exist
        if ( !flow_data_persistence[container.id] ) flow_data_persistence[container.id] = { };

        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        //save
        flow_data_persistence[container.id][this.__current_flow._] = { node : container.node, positions : container.positions };
    }

    public save_the_container_into_this_flow(container: Container, flow: string) 
    {
        const previous_flow_saved : string | null = this.__current_flow._;

        this.__current_flow._ = flow;

        this.save_id_into_the_containers_ids(container.id);

        this.save_data_not_related_to_the_flow(container);

        this.save_data_related_to_the_flow(container);

        this.__current_flow._ = previous_flow_saved;
    }
}

class Delete_Container_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public delete(container: Container): void 
    {
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        const index = this.__persistence.containers_ids[this.__current_flow._].indexOf(container.id);
        this.__persistence.containers_ids[this.__current_flow._].splice(index, 1);
        delete this.__persistence.containers_data_fix[container.id];
        delete this.__persistence.containers_data_flow[container.id][this.__current_flow._];
    }
}

class Get_Container_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public get_all_containers_of_the_current_flow(): Container[]
    {
        const result : Container[] = [];

        const current_flow : string | null = this.__current_flow._;

        if ( current_flow == null ) throw new Error("No flow has been set");

        this.__persistence.containers_ids[current_flow].forEach((id : string) =>
        {
            result.push(this.get_container_by_id_and_flow(id, current_flow));
        });

        return result;
    }

    public get_container_by_id_and_flow(container_id : string, flow: string) : Container
    {        
        const container : Container = this.__persistence.containers_data_fix[container_id];

        const flow_data : IContainer_Data_Flow = this.__persistence.containers_data_flow[container_id][flow];

        container.positions = flow_data.positions;

        container.node = flow_data.node;

        return container;
    }

    public get_container_by_id_for_the_current_flow(container_id : string) : Container
    {
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        return this.get_container_by_id_and_flow(container_id, this.__current_flow._);
    }

    public get_default_position_of_the_root(): Vector<3> 
    {
        return this.__persistence.default_position_of_the_root;
    }

    public prepare_all_ptr_for_the_current_flow(): void 
    {
        const current_flow : string | null = this.__current_flow._;

        if ( current_flow == null ) throw new Error("No flow has been set");

        this.__persistence.containers_ids[current_flow].forEach((id : string) =>
        {
            this.get_container_by_id_and_flow(id, current_flow);
        });
    }

    public get_root_container_of_the_current_flow(): Container 
    {
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        return this.get_root_container_of_this_flow(this.__current_flow._);
    }

    public get_root_container_of_this_flow(flow: string): Container 
    {
        let result : Container | null = null;

        for(let data in this.__persistence.containers_data_fix)
        {
            const container_data = this.__persistence.containers_data_fix[data];

            if(container_data.roots.includes(flow)) result = this.get_container_by_id_and_flow(container_data.id, flow);
        }
        
        if(result == null) throw new Error("Enable to find the root container of this flow");
        
        return result;
    }

    public get_default_ratio(): Matrix<4> 
    {
        return this.__persistence.default_container_ratio;
    }
}

