import { Dto } from './../../../port/driver/dto/Dto';
import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Mark_As_Root_Response } from "../../../port/driver/response/Mark_As_Root_Response";
import { Container } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IMark_As_Root_Repository } from "../interfaces/IMark_As_Root_Repository";
import { Data_Type } from '../../../port/driver/dto/IDto';
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';

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

    public put_its_positions_to_root(root_point: Vector): void 
    {
        this.__cotainer.__.update_position_from_abs_root(root_point);
    }

    public create_its_new_flow(): string 
    {
        const new_flow : string = crypto.randomUUID();
        this.__cotainer.root.push(new_flow)
        return new_flow;
    }

    public get_dto_response(): Mark_As_Root_Response 
    {
        return new Mark_As_Root_Response(new Dto(this.__cotainer, Data_Type.CONTAINER));
    }

}