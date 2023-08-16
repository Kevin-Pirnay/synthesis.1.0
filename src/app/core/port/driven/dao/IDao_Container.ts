import { Container } from "../../../domain/entities/Container";


export interface IDao_Container
{
    save_the_new_container(container: Container): void;
    save_the_new_root(container: Container): void; 
    delete_container(container: Container): void; 
    get_all_containers_of_the_current_flow() : Container[];
}