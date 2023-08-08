import { Container } from "../../../domain/entities/Container";

export interface IDao_Container
{
    get_all(): Container[];
    save(container: Container): unknown;

}