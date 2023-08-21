import { Dto } from '../../../../port/driver/dto/Dto';
import { Vector } from "../../../../common/Vector/Vector";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { Container, Container_Positions, Node } from "../../../entities/Container";
import { IMark_As_Root } from "../../../use_cases/Mark_As_Root";
import { Data_Type } from "../../../handlers/handlers_entities/Data_Type";
import { Matrix } from '../../../../common/Matrix/Matrix';
import { Mark_As_Root_Response } from '../../../../port/driver/response/Response';

export class Mark_As_Root implements IMark_As_Root {
    constructor(private readonly __cotainer: Container) { }

    public update_its_node_relationship_and_positions_for_the_new_flow(root_point: Vector<3>): void {
        const temp_rel_ratio: Matrix<4> = this.__cotainer.positions.rel_ratio;
        this.__cotainer.positions = new Container_Positions();
        this.__cotainer.positions.rel_ratio.__.assign_new_data(temp_rel_ratio);
        this.__cotainer.positions.rel_root.__.assign_new_data(Vector_.zero(3));
        this.__cotainer.__.update_position_from_abs_root(root_point);
        this.__cotainer.node = new Node();
    }

    public get_dto_response(): Mark_As_Root_Response {
        return new Mark_As_Root_Response(new Dto(this.__cotainer, Data_Type.CONTAINER));
    }
}
