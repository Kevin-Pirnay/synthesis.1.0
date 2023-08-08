import { Move_Container_Request } from "../../port/driver/request/Move_Container_Request";
import { Unit_Node } from "../entities/Container";

export class Move_Container_Use_case
{
    public handle(request : Move_Container_Request) : void
    {
        //update position container
        const delta = request.new_pos.__.substract_by_vector_new(request.container.positions.abs_root);

        request.container.__.update_position_by_delta(delta);

        //update positions children units : ligatures and containers
        request.container.node.children.forEach((unit : Unit_Node) =>
        {
            unit.container.positions.rel_ratio.__.substract_by_vector(delta);

            unit.ligature.__.update_ratio();
        });

        //update positions parents ligatures
        request.container.node.parents.forEach((unit : Unit_Node) =>
        {
            unit.ligature.__.update_ratio();
        });
    }
}