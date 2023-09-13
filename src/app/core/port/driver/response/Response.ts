import { Observer } from "../../../common/Observer/Observer";
import { Container } from "../../../domain/entities/Container";
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

export class Choose_Root_Response
{
    constructor(public dtos : IDto[]) { }
}

export class Choosen_Root_Response
{
    constructor(public dtos : IDto[]) { }
}

export class View_Choose_Root_Response
{
    constructor(public dtos : IDto[]) { }
}

export class View_Link_Roots_Response
{
    constructor(public observer : Observer<IDto[]>) { }
}

export class Select_Link_Roots_Response
{
    constructor(public dtos : IDto[]) { }
}

export class Select_SubTree_Response
{
    constructor(public containers : Container[]) { }
}