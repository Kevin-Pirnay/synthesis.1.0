import { Data_Type, IDto } from "./IDto";

export class Dto implements IDto
{
    constructor (public element: any, public type: Data_Type) { }
}