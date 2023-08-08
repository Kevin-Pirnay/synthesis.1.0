import { Container } from "../../../core/domain/entities/Container/Container";
import { Ligature } from "../../../core/domain/entities/Ligature";
import { ICreateRepository } from "../../../core/port/driven/repository/ICreateRepository";

export class CreateRepository implements ICreateRepository
{
    save_root(container: Container): void {
        throw new Error("Method not implemented.");
    }
    save_unit(ligature: Ligature, container: Container): void {
        throw new Error("Method not implemented.");
    }

}