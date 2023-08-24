import { Ptr } from "../../../core/common/Ptr";
import { Container } from "../../../core/domain/entities/Container";
import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";
import { ILigature_Data_Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";


export class Dao_Ligature implements IDao_Ligature
{
    private readonly __ligature_handler : Save_Ligature_Handler;
    private readonly __delete_handler : Delete_Ligature_Handler;
    private readonly __get_handler : Get_Ligature_Handler;

    constructor(runtime_persistence : Runtime_Persistence, current_flow : Ptr<string>) 
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

    public save_the_ligature_into_this_flow(ligature: Ligature, flow: string): void 
    {
        this.__ligature_handler.save_the_ligature_into_this_flow(ligature, flow);
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
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public save_id_into_the_ligatures_ids(ligature_id : string) : void 
    {
        const ligatures_ids = this.__persistence.ligatures_ids;
        
        const current_flow = this.__current_flow._;

        if ( current_flow == null ) throw new Error("No flow has been set");

        //init if not exist
        if ( !ligatures_ids[current_flow] ) ligatures_ids[current_flow] = [];

        //save
        if ( ligatures_ids[current_flow].find(id => id == ligature_id) ) return;

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
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        flow_data_persistence[ligature.id][this.__current_flow._] = { parent : ligature.parent, child : ligature.child, positions : ligature.positions };
    }

    public save_the_ligature_into_this_flow(ligature: Ligature, flow: string) 
    {
        const previous_flow_saved : string | null = this.__current_flow._;

        this.__current_flow._ = flow;

        this.save_id_into_the_ligatures_ids(ligature.id);

        this.save_data_not_related_to_the_flow(ligature);

        this.save_data_related_to_the_flow(ligature);

        this.__current_flow._ = previous_flow_saved;
    }
}

class Delete_Ligature_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public delete(ligature : Ligature): void 
    {
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        const index = this.__persistence.ligatures_ids[this.__current_flow._].indexOf(ligature.id);
        this.__persistence.ligatures_ids[this.__current_flow._].splice(index, 1);
        delete this.__persistence.ligatures_data_fix[ligature.id];
        delete this.__persistence.ligatures_data_flow[ligature.id][this.__current_flow._];
    }
}

class Get_Ligature_Handler
{
    constructor(private readonly __persistence : Runtime_Persistence, private readonly __current_flow : Ptr<string>) { }

    public get_all_ligatures_of_the_current_flow(): Ligature[]
    {
        const result : Ligature[] = [];

        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        if(!this.__persistence.ligatures_ids[this.__current_flow._]) return result;

        this.__persistence.ligatures_ids[this.__current_flow._].forEach((id : string) =>
        {
            result.push(this.get_ligature_by_id(id));
        });

        return result;
    }

    public get_ligature_by_id(ligature_id : string) : Ligature
    {        
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        const flow_data : ILigature_Data_Flow = this.__persistence.ligatures_data_flow[ligature_id][this.__current_flow._];

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
        if ( this.__current_flow._ == null ) throw new Error("No flow has been set");

        if(!this.__persistence.ligatures_ids[this.__current_flow._]) return;
        
        this.__persistence.ligatures_ids[this.__current_flow._].forEach((id : string) =>
        {
            this.get_ligature_by_id(id);
        });
    }
}