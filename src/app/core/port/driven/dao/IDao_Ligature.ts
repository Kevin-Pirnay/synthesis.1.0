import { Ligature } from "../../../domain/entities/Ligature";

export interface IDao_Ligature
{
    update_all_ptr_to_the_current_flow(): void;
    get_all(): Ligature[];
    get_by_id(ligature_id : string) : Ligature;
    save(ligature: Ligature): void;
    delete(ligature: Ligature): void;
}