import { Container } from "../../../domain/entities/Container";

export interface IDao_Container
{
    get_all(): Container[];
    delete(container: Container): void;
    save(container: Container): void;

}