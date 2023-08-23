import { Observer } from '../../../common/Observer/Observer';
import { View_Link_Roots_Response } from '../../../port/driver/response/Response';
import { IChange_Flow_Handler } from '../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler';
import { IView_As_Root_Handler } from '../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';
import { IZoom_Handler } from '../../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { ILink_Roots_Repository } from '../../repository/interfaces/IRepository';
import { IDto } from './../../../port/driver/dto/IDto';


export class Init_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
        private readonly __flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler
    ) { }
    
    public handle() : View_Link_Roots_Response
    {
        this.__repository.store_all_subtrees_root();

        this.__repository.init_indexes();

        const indexes = this.__repository.get_next_indexes(1);

        const link_roots : ILink_Roots = this.__repository.get_link_roots_data(indexes, this.__flow_handler, this.__zoom_handler);

        const animation_observer = new Observer<IDto[]>;

        link_roots.anim(animation_observer);

        return new View_Link_Roots_Response(animation_observer);
    }
}

export interface ILink_Roots
{
    anim(observer : Observer<IDto[]>): Promise<void>
}