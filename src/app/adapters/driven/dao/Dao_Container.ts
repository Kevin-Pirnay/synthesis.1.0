import { Container } from "../../../core/domain/entities/Container";
import { IDao_Container } from "../../../core/port/driven/dao/IDao_Container";

export class Dao_Container implements IDao_Container
{
    public get_all(): Container[] 
    {
        throw new Error("Method not implemented.");
    }

    public save(container: Container): unknown 
    {
        throw new Error("Method not implemented.");
    }
}