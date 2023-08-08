import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../../domain/entities/Container/Container";

export class Move_Container_Request
{
    constructor(public new_pos : Vector, public container : Container) { }
}