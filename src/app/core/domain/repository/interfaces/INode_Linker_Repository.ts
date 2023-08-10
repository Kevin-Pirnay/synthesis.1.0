import { Container } from "../../entities/Container";

export interface INode_Linker_Repository
{
    get_parent_container_of(container_to_remove: Container): Container | null;
    get_parent_container(container_to_remove: Container): import("../../entities/Container").Container | null;

}