import { Container } from "../../../domain/entities/Container";

export interface IDao_Container
{
    save_root(container: Container): void;
    get_all(): Container[];
    delete(container: Container): void;
    save(container: Container): void;

}