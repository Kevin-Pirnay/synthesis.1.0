import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../../domain/entities/Container";
import { Ligature } from "../../../domain/entities/Ligature";
import { Root_Choice } from "../../../domain/entities/Root_Choice";


export class Create_Container_Request
{
    constructor(public position : Vector<3>, public parent_container : Container | null = null) {}
}

export class Delete_Container_Request
{
    constructor(public container : Container) { }
}

export class Move_Container_Request
{
    constructor(public new_pos : Vector<3>, public container : Container) { }
}

export class Move_ligature_Request
{
    constructor(public new_pos : Vector<3>, public ligature : Ligature) { }
}

export class Assign_Ligature_Request
{
    constructor(public ligature : Ligature, public container : Container | null) { }
}

export class Move_View_Request
{
    constructor(public direction : string) { }
}

export class Zoom_Request
{
    constructor(public direction : number) { }
}

export class View_As_Root_Request
{
    constructor(public container : Container) { }
}

export class Mark_As_Root_Request
{
    constructor(public container : Container) { }
}

export class Back_View_Request
{
    constructor(public container_id : string | null) { }
}

export class Paginate_Request
{
    constructor(public container : Container) { }
}

export class View_Paginate_Request
{
    constructor(public direction : number) { }
}

export class Choose_Root_Request
{
    constructor(public container :Container) { }
}

export class Choosen_Root_Request
{
    constructor(public chosen_root : Root_Choice) { }
}

export class View_Choose_Root_Request
{
    constructor(public direction : number) { }
}

export class View_Link_Roots_Request
{
    constructor(public direction : number) { }
}

export class Link_Roots_Request
{
    constructor(public container : Container) { }
}

export class Select_Link_Roots_Request
{
    constructor(public container : Container) { }
}

export class Select_SubTree_Request
{
    constructor(public container : Container) { }
}