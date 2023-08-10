import { Ligature } from "../../../domain/entities/Ligature";

export interface IDao_Ligature
{
    get_all(): Ligature[];
    get_by_id(ligature_id : string) : Ligature;
    save(ligature: Ligature): void;
    delete(ligature: Ligature): void;
}