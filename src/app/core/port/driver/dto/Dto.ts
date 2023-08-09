import { Data_Type, IDto } from "./IDto";

export class Dto implements IDto
{
    constructor (public _: any, public type: Data_Type) { }
}