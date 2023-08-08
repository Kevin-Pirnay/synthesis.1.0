import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Ligature implements IDao_Ligature
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public get_all(): Ligature[] 
    {
        const result : Ligature[] = [];

        for(const [key, value] of Object.entries(this.__runtime_persistence.ligatures))
        {
            result.push(value);
        }

        return result;
    }

    public save(ligature: Ligature): void 
    {
        this.__runtime_persistence.ligatures[ligature.id] = ligature;
    }
}