import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IMark_As_Root_Repository } from "../interfaces/IMark_As_Root_Repository";

export class Mark_As_Root_Repository implements IMark_As_Root_Repository
{
    get_root_position(): Vector 
    {
        throw new Error("Method not implemented.");
    }

    get_mark_as_root_data(container: Container): IMark_As_Root 
    {
        throw new Error("Method not implemented.");
    }
}