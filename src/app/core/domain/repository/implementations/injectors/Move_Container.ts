import { Vector } from "../../../../common/Vector/Vector";
import { Container, Unit_Node } from "../../../entities/Container";
import { IMove_Container } from "../../../use_cases/Move_Container";

export class Move_Container implements IMove_Container 
{
    public static get_move_container(target_position: Vector, container: Container): IMove_Container 
    {
        return new Move_Container(target_position, container);
    }

    constructor(private readonly __target_position: Vector, private readonly __container: Container) { }

    public get_the_delta_from_its_current_position_and_the_target_position(): Vector 
    {
        const delta = this.__target_position.__.substract_by_vector_new(this.__container.positions.abs_root);

        return delta;
    }

    public update_its_position(delta: Vector): void 
    {
        this.__container.__.update_position_by_delta(delta);
    }

    public update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta: Vector): void 
    {
        this.__container.node.children.forEach((unit: Unit_Node) => 
        {
            if (unit.container) unit.container.positions.rel_ratio.__.substract_by_vector(delta);

            if (unit.ligature) unit.ligature.__.update_ratio();
        });
    }

    public update_positions_of_its_parents_ligatures(): void 
    {
        this.__container.node.parent.ligature?.__.update_ratio();
    }
}
