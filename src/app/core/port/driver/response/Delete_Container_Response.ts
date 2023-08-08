import { Container, Unit_Node } from "../../../domain/entities/Container";

export class Delete_Container_Response
{
    constructor(public ids_to_remove : string[]) { }
}