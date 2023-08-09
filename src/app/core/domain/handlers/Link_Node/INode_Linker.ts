import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";

export interface INode_Linker
{
    link_nodes(parent_container : Container, ligature : Ligature, container : Container) : void;
    link_parent_to_children(parent_container: Container, children_unit: Unit_Node[]): void;
    remove_unit_from_parent(parents_containers: Container[], c_to_remove: Container): void;
    remove_unit_from_children(children_container: Container[], c_to_remove: Container): void; 
}