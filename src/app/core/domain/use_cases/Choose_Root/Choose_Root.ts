import { IDto } from './../../../port/driver/dto/IDto';
import { Choosen_Root_Request } from '../../../port/driver/request/request';
import { Choosen_Root_Response } from '../../../port/driver/response/Response';


export class Choosen_Root_Use_case
{
    constructor(private readonly __change_root_handler : IChange_Root_Handler) { }
    
    public handle(request : Choosen_Root_Request) : Choosen_Root_Response
    {
        const dtos : IDto[] = this.__change_root_handler.change_root(request.flow);

        return new Choosen_Root_Response(dtos);
    }
}

interface IChoosen_Root
{
    anim_the_root_choosen() : void;
}