import { IDto } from '../../../port/driver/dto/IDto';
import { Choosen_Root_Request } from '../../../port/driver/request/request';
import { Choosen_Root_Response } from '../../../port/driver/response/Response';
import { IChange_Root_Handler } from '../../handlers/handlers_use_case/Change_Root/IChange_Root_Handler';
import { IMove_View_Handler } from '../../handlers/handlers_use_case/Move_View/IMove_View_Handler';
import { IZoom_Handler } from '../../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { IChoose_Root_Repository } from '../../repository/interfaces/IRepository';


export class Chosen_Root_Use_case
{
    constructor(
        private readonly __change_root_handler : IChange_Root_Handler, 
        private readonly __repository : IChoose_Root_Repository,
    ) { }
    
    public async handle(request : Choosen_Root_Request) : Promise<Choosen_Root_Response>
    {
        const chosen_root : IChoosen_Root = this.__repository.get_chosen_root(request.chosen_root); 

        await chosen_root.anim();
        
        const dtos : IDto[] = this.__change_root_handler.change_root(request.chosen_root.root_id);

        return new Choosen_Root_Response(dtos);
    }
}

export interface IChoosen_Root
{
    anim() : Promise<void>;
}