import { Container } from "../../../domain/entities/Container";

export interface IDao_Container
{
    update_all_ptr_to_the_current_flow(): void;
    get_root_flow(): Container;
    save_new_root(container: Container): void;
    get_all(): Container[];
    get_by_id(container_id : string) : Container;
    delete(container: Container): void;
    save_new_container(container: Container): void;
}