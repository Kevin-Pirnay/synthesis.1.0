import { Container, Unit_Node } from "../../entities/Container";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IRemove_Container } from "../../use_cases/Delete_Container";

export interface IDelete_Container_Repository
{
    get_remove_container(container: Container, node_linker_handler: INode_Linker): IRemove_Container;
    delete_unit_from_memory(unit_to_remove: Unit_Node): unknown;
}