import { Vector } from "../../../../common/Vector/Vector";
import { Ligature } from "../../../entities/Ligature";
import { IMoving_Ligature } from "../../../use_cases/Move_Ligature";

export class Moving_Ligature implements IMoving_Ligature 
{
    public static get_moving_ligature_injector(ligature: Ligature): IMoving_Ligature 
    {
        return new Moving_Ligature(ligature);
    }

    constructor(private readonly __ligature: Ligature) { }

    public substract_a_margin_to_the_target_position_to_let_a_margin_between_the_cursor_and_the_ligature(target_pos: Vector<3>, margin: Vector<3>): Vector<3> 
    {
        const adjust_pos: Vector<3> = target_pos.__.substract_by_vector(margin); //in order_to have access to the container under the grip

        return adjust_pos;
    }

    public get_the_delta_between_its_position_and_this_position(target_pos: Vector<3>): Vector<3> 
    {
        const delta: Vector<3> = target_pos.__.substract_by_vector_new(this.__ligature.positions.abs_ratio._[0]);

        return delta;
    }

    public update_its_position_according_to_the_delta(delta: Vector<3>) 
    {
        this.__ligature.__.update_ratio_by_delta(delta);
    }
}
