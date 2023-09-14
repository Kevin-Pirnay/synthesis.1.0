import { Observer } from '../../../common/Observer/Observer';
import { IDto } from '../../../port/driver/dto/IDto';
import { Choosen_Root_Request } from '../../../port/driver/request/request';
import { Choosen_Root_Response } from '../../../port/driver/response/Response';
import { IChange_Flow_Handler } from '../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler';
import { IZoom_Handler } from '../../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { IChoose_Root_Repository } from '../../repository/interfaces/IRepository';


export class Chosen_Root_Use_case
{
    constructor(
        private readonly __change_flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler,
        private readonly __repository : IChoose_Root_Repository,
    ) { }
    
    public async handle(request : Choosen_Root_Request) : Promise<Choosen_Root_Response>
    {
        const chosen_root : IChoosen_Root = this.__repository.get_chosen_root_injector(request.chosen_root);
        
        await chosen_root.anim(request.witness_anim);

        this.__reinit_zoom();

        const dtos : IDto[] = this.__change_flow_handler.change_flow_and_get_subtree_from_the_root(request.chosen_root.flow);

        return new Choosen_Root_Response(dtos);
    }

    private __reinit_zoom() : void
    {
        const unzoom : number = this.__zoom_handler.get_current_unzoom_factor();        

        this.__zoom_handler.zoom_current_flow_by_factor_from_the_current_factor(unzoom);

        this.__zoom_handler.reinit_zoom_level();
    }
}

export interface IChoosen_Root
{
    anim(witness : Observer<number>) : Promise<void>;
}