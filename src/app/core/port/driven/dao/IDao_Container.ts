import { Container } from "../../../domain/entities/Container";

export interface IDao_Container
{
    save_new_root(container: Container): void;
    get_all(): Container[];
    delete(container: Container): void;
    save_new_container(container: Container): void;

}