import { Ligature } from "../../../domain/entities/Ligature";


export interface IDao_Ligature
{
    save_the_new_ligature(ligature: Ligature): void; 
    delete_ligature(ligature: Ligature): void; 
    get_all_ligatures_of_the_current_flow() : Ligature[];
}