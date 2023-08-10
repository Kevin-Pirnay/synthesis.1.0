import { Dto } from './../../../port/driver/dto/Dto';
import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Mark_As_Root_Response } from "../../../port/driver/response/Mark_As_Root_Response";
import { Container, Container_Positions, Node } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IMark_As_Root_Repository } from "../interfaces/IMark_As_Root_Repository";
import { Data_Type } from '../../../port/driver/dto/IDto';
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';
import { Matrix } from '../../../common/Matrix/Matrix';

export class Mark_As_Root_Repository implements IMark_As_Root_Repository
{
    constructor(private readonly __container_dao : IDao_Container) { }

    save_new_root(container: Container) : void 
    {
        this.__container_dao.save_new_root(container);
    }

    get_root_position(): Vector 
    {
        //****  change that *****
        return Vector_.new([100,250]);
    }

    get_mark_as_root_data(container: Container): IMark_As_Root 
    {
        return new Mark_As_Root(container);
    }
}

class Mark_As_Root implements IMark_As_Root
{
    constructor(private readonly __cotainer : Container) { }

    public update_its_node_relationship_and_positions_for_the_new_flow(root_point: Vector): void 
    {
        const temp_rel_ratio : Matrix<4> = this.__cotainer.positions.rel_ratio;
        this.__cotainer.positions = new Container_Positions();
        this.__cotainer.positions.rel_ratio.__.assign_new_data(temp_rel_ratio);
        this.__cotainer.positions.rel_root.__.assign_new_data(Vector_.zero());
        this.__cotainer.__.update_position_from_abs_root(root_point);
        this.__cotainer.node = new Node();
    }

    public get_dto_response(): Mark_As_Root_Response 
    {
        return new Mark_As_Root_Response(new Dto(this.__cotainer, Data_Type.CONTAINER));
    }

}