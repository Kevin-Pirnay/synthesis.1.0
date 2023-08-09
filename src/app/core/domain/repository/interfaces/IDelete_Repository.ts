import { Container, Unit_Node } from "../../entities/Container";

export interface IDelete_Container_Repository
{
    delete_unit(unit_to_remove: Unit_Node): unknown;
    get_container_units(parents_containers: Container[], c_to_remove: Container): Unit_Node[];    
}