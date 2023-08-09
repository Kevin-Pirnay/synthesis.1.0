import { Container, Unit_Node } from "../../entities/Container";

export interface IDelete_Container_Repository
{
    delete_unit(unit_to_remove: Unit_Node): unknown;
}