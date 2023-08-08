import { Ligature } from "../../../domain/entities/Ligature";

export interface IDao_Ligature
{
    get_all(): Ligature[];
    save(ligature: Ligature): unknown;

}