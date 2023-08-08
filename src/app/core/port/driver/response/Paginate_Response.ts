import { IDto } from "../dto/IDto";

export class Paginate_Response
{
    constructor(public dtos : IDto[]) { }
}