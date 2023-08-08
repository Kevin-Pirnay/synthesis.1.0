import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";

export class Dao_Container implements IDao_Container
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public get_all(): Container[] 
    {
        const result : Container[] = [];

        for(const [key, value] of Object.entries(this.__runtime_persistence.containers))
        {
            result.push(value);
        }

        return result;
    }

    public save(container : Container): void 
    {
        this.__runtime_persistence.containers[container.id] = container;
    }
}