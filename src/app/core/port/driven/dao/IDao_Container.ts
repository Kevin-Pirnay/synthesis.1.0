import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../../domain/entities/Container";


export interface IDao_Container
{
    get_root_container_of_the_current_flow(): Container;
    get_root_container(flow: string): Container; 
    prepare_all_ptr_for_the_current_flow(): void;
    get_container_by_id_for_the_current_flow(container_id: string): Container;
    save_the_new_container(container: Container): void;
    save_the_new_root(container: Container): void; 
    delete_container(container: Container): void; 
    get_all_containers_of_the_current_flow() : Container[];
    get_default_position_of_the_root() : Vector<3>;
}