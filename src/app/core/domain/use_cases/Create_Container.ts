import { Ligature_ } from './../handlers/handlers_entities/Ligature_';
import { INode_Linker } from './../handlers/handlers_use_case/Link_Node/INode_Linker';
import { Matrix } from "../../common/Matrix/Matrix";
import { Vector_ } from "../../common/Vector/Vector_";
import { Dto } from "../../port/driver/dto/Dto";
import { Data_Type, IDto } from "../../port/driver/dto/IDto";
import { Container } from "../entities/Container";
import { Container_ } from "../handlers/handlers_entities/Container_";
import { Ligature } from "../entities/Ligature";
import { Vector } from '../../common/Vector/Vector';
import { Create_Container_Request } from '../../port/driver/request/request';
import { Create_Container_Response } from '../../port/driver/response/Response';
import { ICreate_Repository } from '../repository/interfaces/IRepository';
import { IZoom_Handler } from '../handlers/handlers_use_case/Zoom/IZoom_Handler';


export class Create_Container_Use_case
{
    private readonly __create_handler : Create_Handler;

    constructor(
        repository : ICreate_Repository,
        link_handler : INode_Linker,
        zoom_handler : IZoom_Handler
    ) 
    { 
        this.__create_handler = new Create_Handler(repository, link_handler, zoom_handler);
    }  

    public handle(request: Create_Container_Request) : Create_Container_Response
    {
        const ratio : Matrix<4> = this.__create_handler.get_default_container_rel_ratio();

        if ( request.parent_container == null ) return this.__create_handler.create_a_root_container(ratio, request.position);

        else return this.__create_handler.create_a_new_unit(request.parent_container, ratio, request.position);
    }
}

class Create_Handler
{
    constructor(
        private readonly __repository : ICreate_Repository,
        private readonly __link_handler : INode_Linker,
        private readonly __zoom_handler : IZoom_Handler
    ) { } 

    public create_a_root_container(ratio : Matrix<4>, position : Vector) : Create_Container_Response
    {
        const container : Container = Container_.new(ratio, position, Vector_.zero());

        this.__repository.save_root(container);

        this.__zoom_handler.update_container_with_current_zoom(container);

        return new Create_Container_Response([new Dto(container, Data_Type.CONTAINER)]);
    }

    public create_a_new_unit(parent_container : Container, default_ratio : Matrix<4>, position : Vector) : Create_Container_Response
    {
        const container : Container = Container_.new(default_ratio, position, parent_container.positions.abs_root);

        const ligature : Ligature = Ligature_.new(parent_container, container);

        this.__link_handler.link_nodes(parent_container, ligature, container);

        this.__repository.save_unit(ligature, container);

        this.__zoom_handler.update_unit_with_current_zoom(ligature, container);

        const dtos : IDto[] = [ new Dto(container, Data_Type.CONTAINER), new Dto(ligature, Data_Type.LIGATURE) ];
        
        return new Create_Container_Response(dtos);
    }

    public get_default_container_rel_ratio() : Matrix<4>
    {
        return this.__repository.get_default_container_rel_ratio();
    }
}

