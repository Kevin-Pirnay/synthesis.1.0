import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Mark_As_Root_Response } from "../../../port/driver/response/Mark_As_Root_Response";
import { Container } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IMark_As_Root_Repository } from "../interfaces/IMark_As_Root_Repository";

export class Mark_As_Root_Repository implements IMark_As_Root_Repository
{
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
        throw new Error("Method not implemented.");
    }

    public create_its_new_flow(): void 
    {
        throw new Error("Method not implemented.");
    }

    public get_dto_response(): Mark_As_Root_Response 
    {
        throw new Error("Method not implemented.");
    }

}