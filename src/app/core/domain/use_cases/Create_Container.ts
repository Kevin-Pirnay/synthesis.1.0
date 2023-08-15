import { Matrix } from "../../common/Matrix/Matrix";
import { Vector_ } from "../../common/Vector/Vector_";
import { ICreate_Repository } from "../repository/interfaces/ICreate_Repository";
import { Dto } from "../../port/driver/dto/Dto";
import { Data_Type, IDto } from "../../port/driver/dto/IDto";
import { Create_Container_Request } from "../../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from "../../port/driver/response/Create_Container_Response";
import { Container } from "../entities/Container";
import { Container_ } from "../handlers/Container_";
import { Ligature } from "../entities/Ligature";
import { Ligature_ } from "../handlers/Ligature_";
import { IZoom_Handeler } from "../handlers/Zoom/IZoom_Handeler";
import { Vector } from "../../common/Vector/Vector";
import { INode_Linker } from "../handlers/Link_Node/INode_Linker";


export class Create_Container_Use_case
{
    constructor(
        private readonly __repository : ICreate_Repository,
        private readonly _link_handler : INode_Linker,
        private readonly __zoom_handler : IZoom_Handeler) { }

    public handle(request: Create_Container_Request) : Create_Container_Response
    {
        const ratio : Matrix<4> = this.__repository.get_default_container_ratio();

        if ( request.parent_container == null ) return this.__create_a_root_container(ratio, request.position);

        else return this.__create_a_new_unit(request.parent_container, ratio, request.position);
    }

    private __create_a_root_container(ratio : Matrix<4>, position : Vector) : Create_Container_Response
    {
        const container : Container = Container_.new(ratio, position, Vector_.zero());

        this.__repository.save_root(container);

        this.__zoom_handler.update_container_with_current_zoom(container);

        return new Create_Container_Response([new Dto(container, Data_Type.CONTAINER)]);
    }

    private __create_a_new_unit(parent_container : Container, default_ratio : Matrix<4>, position : Vector) : Create_Container_Response
    {
        const container : Container = Container_.new(default_ratio, position, parent_container.positions.abs_root);

        const ligature : Ligature = Ligature_.new(parent_container, container);

        this._link_handler.link_nodes(parent_container, ligature, container);

        this.__repository.save_unit(ligature, container);

        this.__zoom_handler.update_unit_with_current_zoom(ligature, container);

        const dtos : IDto[] = [ new Dto(container, Data_Type.CONTAINER), new Dto(ligature, Data_Type.LIGATURE) ];
        
        return new Create_Container_Response(dtos);
    }
}