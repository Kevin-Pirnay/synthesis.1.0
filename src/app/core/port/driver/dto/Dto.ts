import { Dto_Type, IDto } from "./IDto";

export class Dto implements IDto
{
    constructor (public _: any, public type: Dto_Type) { }
}