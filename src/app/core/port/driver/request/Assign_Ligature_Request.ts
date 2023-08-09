import { Container } from "../../../domain/entities/Container";
import { Ligature } from "../../../domain/entities/Ligature";

export class Assign_Ligature_Request
{
    constructor(public ligature : Ligature, public container : Container | null) { }
}