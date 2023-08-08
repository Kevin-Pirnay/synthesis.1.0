import { Container } from "../../../core/domain/entities/Container"
import { Ligature } from "../../../core/domain/entities/Ligature"

export class Runtime_Persistence
{
    public containers : { [id : string]: Container } = {}
    public ligatures : { [id : string] : Ligature } = {}
}