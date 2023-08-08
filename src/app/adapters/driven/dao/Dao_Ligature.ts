import { Ligature } from "../../../core/domain/entities/Ligature";
import { IDao_Ligature } from "../../../core/port/driven/dao/IDao_Ligature";

export class Dao_Ligature implements IDao_Ligature
{
    public get_all(): Ligature[] 
    {
        throw new Error("Method not implemented.");
    }

    public save(ligature: Ligature): unknown 
    {
        throw new Error("Method not implemented.");
    }
}