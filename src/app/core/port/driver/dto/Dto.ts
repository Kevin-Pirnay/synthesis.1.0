import { IDto } from "./IDto";
import { Data_Type } from "../../../domain/entities/Data_Type";

export class Dto implements IDto
{
    constructor (public element: any, public type: Data_Type) { }
}