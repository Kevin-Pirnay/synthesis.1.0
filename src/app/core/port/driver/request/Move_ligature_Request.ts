import { Vector } from "../../../common/Vector/Vector";
import { Ligature } from "../../../domain/entities/Ligature";

export class Move_ligature_Request
{
    constructor(public new_pos : Vector, public ligature : Ligature) { }
}