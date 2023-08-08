import { Container, Unit_Node } from "../../entities/Container";

export interface IDelete_Container_Repository
{
    delete_unit(unit_to_remove: Unit_Node): unknown;
    link_parent_to_children(arg0: Container, children_unit: Unit_Node[]): void;
    get_container_units(parents_containers: Container[], c_to_remove: Container): Unit_Node[];
    remove_unit_from_parent(parents_containers: Container[], c_to_remove: Container): void;
    remove_unit_from_children(children_container: Container[], c_to_remove: Container): void;
    
}