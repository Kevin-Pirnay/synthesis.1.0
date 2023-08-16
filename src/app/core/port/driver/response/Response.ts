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

export class Mark_As_Root_Response
{
    constructor(public dto : IDto) { }
}

export class Back_View_Response
{
    constructor(public dtos : IDto[]) { }
}

export class Paginate_Response
{
    constructor(public dtos : IDto[]) { }
}

export class View_Paginate_Response
{
    constructor(public dtos : IDto[]) { }
}