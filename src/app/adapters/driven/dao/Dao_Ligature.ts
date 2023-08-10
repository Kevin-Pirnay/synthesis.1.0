import { Container } from "../../../core/domain/entities/Container";
import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";
import { ILigature_Data_Fix, ILigature_Data_Flow, Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Ligature implements IDao_Ligature
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public delete(ligature: Ligature): void 
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const index = this.__runtime_persistence.ligatures_ids.indexOf(ligature.id);
        this.__runtime_persistence.ligatures_ids.splice(index, 1);
        delete this.__runtime_persistence.ligatures_fix[ligature.id];
        delete this.__runtime_persistence.ligatures_flow[ligature.id][current_flow];
    }

    public get_all(): Ligature[] 
    {
        const result : Ligature[] = [];

        this.__runtime_persistence.ligatures_ids.forEach((id : string) =>
        {
            result.push(this.__assemble_ligature(id));
        });

        return result;
    }

    public save(ligature: Ligature): void 
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        this.__runtime_persistence.ligatures_ids.push(ligature.id);
        this.__runtime_persistence.ligatures_fix[ligature.id] = { id: ligature.id }
        this.__runtime_persistence.ligatures_flow[ligature.id] = { };
        this.__runtime_persistence.ligatures_flow[ligature.id][current_flow] = { parent : ligature.parent, child : ligature.child, positions : ligature.positions };
    }

    private __assemble_ligature(ligature_id : string) : Ligature
    {
        const current_flow = this.__runtime_persistence.stack_flows.slice(-1)[0];

        const flow_data : ILigature_Data_Flow = this.__runtime_persistence.ligatures_flow[ligature_id][current_flow];

        const fix_data : ILigature_Data_Fix = this.__runtime_persistence.ligatures_fix[ligature_id];

        const id = fix_data.id;

        const parent : Container = flow_data.parent;

        const child : Container = flow_data.child;

        const ligature = new Ligature(id, parent, child);

        ligature.positions.abs_ratio.__.assign_new_data(flow_data.positions.abs_ratio);

        return ligature;
    }
}