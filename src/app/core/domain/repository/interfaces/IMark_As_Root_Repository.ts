import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";

export interface IMark_As_Root_Repository
{
    get_position_of_the_root(): Vector;
    save_new_root(container: Container): void;
    get_mark_as_root_data(container: Container): IMark_As_Root;

}