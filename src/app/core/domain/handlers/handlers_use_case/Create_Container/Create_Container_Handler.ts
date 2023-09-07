import { Ligature_ } from '../../handlers_entities/Ligature_';
import { INode_Linker } from '../Link_Node/INode_Linker';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { Dto } from "../../../../port/driver/dto/Dto";
import { IDto } from "../../../../port/driver/dto/IDto";
import { Data_Type } from "../../handlers_entities/Data_Type";
import { Container } from "../../../entities/Container";
import { Container_ } from "../../handlers_entities/Container_";
import { Ligature } from "../../../entities/Ligature";
import { Vector } from '../../../../common/Vector/Vector';
import { Create_Container_Response } from '../../../../port/driver/response/Response';
import { ICreate_Repository } from '../../../repository/interfaces/IRepository';
import { IZoom_Handler } from '../Zoom/IZoom_Handler';

export class Create_Container_Handler {
    constructor(
        private readonly __repository: ICreate_Repository,
        private readonly __link_handler: INode_Linker,
        private readonly __zoom_handler: IZoom_Handler
    ) { }

    public create_a_root_container(ratio: Matrix<4>, position: Vector<3>): Create_Container_Response {
        const container: Container = Container_.new(ratio, position, Vector_.zero(3));

        this.__repository.save_root(container);

        this.__zoom_handler.update_container_with_current_zoom(container);

        return new Create_Container_Response([new Dto(container, Data_Type.CONTAINER)]);
    }

    public create_a_new_unit(parent_container: Container, default_ratio: Matrix<4>, position: Vector<3>): Create_Container_Response {
        const container: Container = Container_.new(default_ratio, position, parent_container.positions.abs_root);

        const ligature: Ligature = Ligature_.new(parent_container, container);

        this.__link_handler.link_nodes(parent_container, ligature, container);

        this.__repository.save_unit(ligature, container);

        this.__zoom_handler.update_unit_with_current_zoom(ligature, container);

        const dtos: IDto[] = [new Dto(container, Data_Type.CONTAINER), new Dto(ligature, Data_Type.LIGATURE)];

        return new Create_Container_Response(dtos);
    }

    public get_default_container_rel_ratio(): Matrix<4> {
        return this.__repository.get_default_container_rel_ratio();
    }
}
