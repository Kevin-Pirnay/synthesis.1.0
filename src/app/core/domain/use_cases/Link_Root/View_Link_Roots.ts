import { Observer } from './../../../common/Observer/Observer';
import { IDto } from "../../../port/driver/dto/IDto";
import { View_Link_Roots_Request } from "../../../port/driver/request/request";
import { View_Link_Roots_Response } from "../../../port/driver/response/Response";
import { IChange_Flow_Handler } from "../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler";
import { IZoom_Handler } from "../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { ILink_Roots_Repository } from "../../repository/interfaces/IRepository";

import { ILink_Roots } from "./Init_Link_Roots";

export class View_Link_Roots_Use_case
{
    constructor(
        private readonly __repository : ILink_Roots_Repository, 
        private readonly __flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler
    ) { }
    
    public handle(request : View_Link_Roots_Request) : View_Link_Roots_Response
    {
        const indexes : number[] = this.__repository.get_next_indexes(request.direction);  
        
        if ( indexes.length <= 1 ) throw new Error("no more indexes stored to show up");      

        const link_roots : ILink_Roots = this.__repository.get_link_roots_injector(indexes, this.__flow_handler, this.__zoom_handler);

        const animation_observer = new Observer<IDto[]>;

        link_roots.anim(animation_observer);

        return new View_Link_Roots_Response(animation_observer);
    }
}