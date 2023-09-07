import { INode_Linker } from './../handlers/handlers_use_case/Link_Node/INode_Linker';
import { Matrix } from "../../common/Matrix/Matrix";
import { Create_Container_Request } from '../../port/driver/request/request';
import { Create_Container_Response } from '../../port/driver/response/Response';
import { ICreate_Repository } from '../repository/interfaces/IRepository';
import { IZoom_Handler } from '../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { Create_Container_Handler } from '../handlers/handlers_use_case/Create_Container/Create_Container_Handler';


export class Create_Container_Use_case
{
    private readonly __create_handler : Create_Container_Handler;

    constructor(
        repository : ICreate_Repository,
        link_handler : INode_Linker,
        zoom_handler : IZoom_Handler
    ) { 
        this.__create_handler = new Create_Container_Handler(repository, link_handler, zoom_handler);
    }  

    public handle(request: Create_Container_Request) : Create_Container_Response
    {
        const ratio : Matrix<4> = this.__create_handler.get_default_container_rel_ratio();

        if ( request.parent_container == null ) return this.__create_handler.create_a_root_container(ratio, request.position);

        else return this.__create_handler.create_a_new_unit(request.parent_container, ratio, request.position);
    }
}