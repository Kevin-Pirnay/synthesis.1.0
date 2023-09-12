import { Observer } from '../../../common/Observer/Observer';
import { Link_Roots_Request } from '../../../port/driver/request/request';
import { View_Link_Roots_Response } from '../../../port/driver/response/Response';
import { IChange_Flow_Handler } from '../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler';
import { IZoom_Handler } from '../../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { ILink_Roots_Repository } from '../../repository/interfaces/IRepository';
import { IDto } from './../../../port/driver/dto/IDto';


export class Init_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
        private readonly __flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler
    ) { }
    
    //warning handle one tree
    public handle(request : Link_Roots_Request) : View_Link_Roots_Response
    {
        this.__repository.store_the_container_to_link(request.container);

        this.__repository.store_all_possible_flow();

        const first_index : number = this.__repository.init_indexes();

        const link_roots : ILink_Roots = this.__repository.get_link_roots_injector_with_the_original_flow(first_index, this.__flow_handler, this.__zoom_handler);

        const animation_observer = new Observer<IDto[]>;

        link_roots.anim(animation_observer);

        return new View_Link_Roots_Response(animation_observer);
    }
}

export interface ILink_Roots
{
    anim(observer : Observer<IDto[]>): Promise<void>
}