import { Container } from "../../../core/domain/entities/Container";
import { Flow } from "../../../core/domain/entities/Flow";
import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";
import { ILigature_Data_Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Ligature implements IDao_Ligature
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence, private readonly __current_flow : Flow) { }

    public delete(ligature: Ligature): void 
    {
        const index = this.__runtime_persistence.ligatures_ids[this.__current_flow._].indexOf(ligature.id);
        this.__runtime_persistence.ligatures_ids[this.__current_flow._].splice(index, 1);
        delete this.__runtime_persistence.ligatures_fix[ligature.id];
        delete this.__runtime_persistence.ligatures_flow[ligature.id][this.__current_flow._];
    }

    public get_all(): Ligature[] 
    {
        const result : Ligature[] = [];

        this.__runtime_persistence.ligatures_ids[this.__current_flow._].forEach((id : string) =>
        {
            result.push(this.__assemble_ligature(id));
        });

        return result;
    }

    public update_all_ptr_to_the_current_flow(): void 
    {
        const ligatures_ids : string[] = this.__runtime_persistence.ligatures_ids[this.__current_flow._];

        if ( !ligatures_ids ) return;

        ligatures_ids.forEach(id =>
        {
            this.__assemble_ligature(id);
        });
    }

    public get_by_id(ligature_id: string): Ligature 
    {
        return this.__assemble_ligature(ligature_id);
    }

    public save(ligature: Ligature): void 
    {
        if(!this.__runtime_persistence.ligatures_ids[this.__current_flow._])
            this.__runtime_persistence.ligatures_ids[this.__current_flow._] = []
        this.__runtime_persistence.ligatures_ids[this.__current_flow._].push(ligature.id);
        this.__runtime_persistence.ligatures_fix[ligature.id] = ligature;
        if(!this.__runtime_persistence.ligatures_flow[ligature.id])
            this.__runtime_persistence.ligatures_flow[ligature.id] = { };
        this.__runtime_persistence.ligatures_flow[ligature.id][this.__current_flow._] = { parent : ligature.parent, child : ligature.child, positions : ligature.positions };
    }

    private __assemble_ligature(ligature_id : string) : Ligature
    {
        const flow_data : ILigature_Data_Flow = this.__runtime_persistence.ligatures_flow[ligature_id][this.__current_flow._];

        const ligature : Ligature = this.__runtime_persistence.ligatures_fix[ligature_id];

        const parent : Container = flow_data.parent;

        const child : Container = flow_data.child;

        ligature.parent = parent;

        ligature.child = child;

        ligature.positions.abs_ratio.__.assign_new_data(flow_data.positions.abs_ratio);

        return ligature;
    }
}