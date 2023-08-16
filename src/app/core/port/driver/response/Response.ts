import { IDto } from "../dto/IDto";


export class Create_Container_Response
{
    constructor(public dtos : IDto[]) { }
}

export class Delete_Container_Response
{
    constructor(public ids_to_remove : string[]) { }
}

export class View_As_Root_Response
{
    constructor(public dtos : IDto[]) { }
}