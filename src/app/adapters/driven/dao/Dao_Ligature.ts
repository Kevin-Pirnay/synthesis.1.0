import { Container } from "../../../core/domain/entities/Container";
import { Flow } from "../../../core/domain/entities/Flow";
import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";
import { ILigature_Data_Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";


export class Dao_Ligature implements IDao_Ligature
{
    private readonly __ligature_handler : Save_Ligature_Handler;
    private readonly __delete_handler : Delete_Ligature_Handler;
    private readonly __get_handler : Get_Ligature_Handler;

    constructor(runtime_persistence : Runtime_Persistence, current_flow : Flow) 
    { 
        this.__ligature_handler = new Save_Ligature_Handler(runtime_persistence, current_flow);
        this.__delete_handler = new Delete_Ligature_Handler(runtime_persistence, current_flow);
        this.__get_handler = new Get_Ligature_Handler(runtime_persistence, current_flow);
    }

    public save_the_new_ligature(ligature: Ligature): void 
    {
        this.__ligature_handler.save_id_into_the_ligatures_ids(ligature.id);
        this.__ligature_handler.save_data_not_related_to_the_flow(ligature);
        this.__ligature_handler.save_data_related_to_the_flow(ligature);
    }

    public delete_ligature(ligature: Ligature): void 
    {
        this.__delete_handler.delete(ligature);
    }

    public get_all_ligatures_of_the_current_flow(): Ligature[] 
    {
        return this.__get_handler.get_all_ligatures_of_the_current_flow();
    }

    prepare_all_ptr_for_the_current_flow(): void 
    {
        this.__get_handler.prepare_all_ptr_for_the_current_flow();
    }
}

class Save_Ligature_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Flow) { }

    public save_id_into_the_ligatures_ids(ligature_id : string) : void 
    {
        const ligatures_ids = this.__persistence.ligatures_ids;
        const current_flow = this.__current_flow.id;

        //init if not exist
        if ( !ligatures_ids[current_flow] ) ligatures_ids[current_flow] = [];

        //save
        ligatures_ids[current_flow].push(ligature_id);
    }

    /**
     * save data not related to the flow
     * save the ptr of the ligature that will serve as a reference in the entire application
     **/
    public save_data_not_related_to_the_flow(ligature : Ligature) : void
    {
        const fix_data_persistence =  this.__persistence.ligatures_data_fix;
        fix_data_persistence[ligature.id] = ligature;
    }

    /**
     * save data related to the flow
     * save ptrs of data that will change according to the flow in order to plug them to the fix data ptr
     **/
    public save_data_related_to_the_flow(ligature : Ligature) : void
    {
        const flow_data_persistence = this.__persistence.ligatures_data_flow;

        //init if not exist
        if ( !flow_data_persistence[ligature.id] ) flow_data_persistence[ligature.id] = { };

        //save
        flow_data_persistence[ligature.id][this.__current_flow.id] = { parent : ligature.parent, child : ligature.child, positions : ligature.positions };
    }
}

class Delete_Ligature_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Flow) { }

    public delete(ligature : Ligature): void 
    {
        const index = this.__persistence.ligatures_ids[this.__current_flow.id].indexOf(ligature.id);
        this.__persistence.ligatures_ids[this.__current_flow.id].splice(index, 1);
        delete this.__persistence.ligatures_data_fix[ligature.id];
        delete this.__persistence.ligatures_data_flow[ligature.id][this.__current_flow.id];
    }
}

class Get_Ligature_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Flow) { }

    public get_all_ligatures_of_the_current_flow(): Ligature[]
    {
        const result : Ligature[] = [];

        this.__persistence.ligatures_ids[this.__current_flow.id].forEach((id : string) =>
        {
            result.push(this.get_ligature_by_id(id));
        });

        return result;
    }

    public get_ligature_by_id(ligature_id : string) : Ligature
    {        
        const flow_data : ILigature_Data_Flow = this.__persistence.ligatures_data_flow[ligature_id][this.__current_flow.id];

        const ligature : Ligature = this.__persistence.ligatures_data_fix[ligature_id];

        const parent : Container = flow_data.parent;

        const child : Container = flow_data.child;

        ligature.parent = parent;

        ligature.child = child;

        ligature.positions.abs_ratio.__.assign_new_data(flow_data.positions.abs_ratio);

        return ligature;
    }

    public prepare_all_ptr_for_the_current_flow() : void
    {
        this.__persistence.ligatures_ids[this.__current_flow.id].forEach((id : string) =>
        {
            this.get_ligature_by_id(id);
        });
    }
}