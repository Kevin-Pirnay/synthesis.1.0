import { Container, Unit_Node } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";


export interface INode_Linker
{
    link_nodes(parent_container : Container, ligature : Ligature, container : Container) : void;
    link_parent_to_children(container_to_remove : Container): void; 
    remove_unit_from_parent(container_to_remove : Container): void; 
    remove_unit_from_children(container_to_remove : Container): void;
    get_container_units(container : Container): Unit_Node | null; 
}