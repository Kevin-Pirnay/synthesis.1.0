import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { Container, Unit_Node } from "../../../entities/Container";
import { IMove_Container } from "../../../use_cases/Move_Container";

export class Move_Container implements IMove_Container 
{
    public static get_move_container_injector(target_position: Vector<3>, container: Container): IMove_Container 
    {
        return new Move_Container(target_position, container);
    }
    
    private readonly __target_position: Vector<3>;
    private readonly __container: Container;

    constructor(position : Vector<3>, container : Container) 
    { 
        this.__target_position = this.__get_adjusted_position(position, container.positions.rel_ratio);
        
        this.__container = container;
    }

    public get_the_delta_from_its_current_position_and_the_target_position(): Vector <3>
    {
        const delta = this.__target_position.__.substract_by_vector_new(this.__container.positions.abs_root);

        return delta;
    }

    private __get_adjusted_position(position : Vector<3>, ratio : Matrix<4>) : Vector<3>
    {
        const width : number = ratio._[1]._[0] - ratio._[0]._[0];

        const heigth : number = ratio._[3]._[1] - ratio._[0]._[1];

        const adjusted_pos : Vector<3> = position.__.substract_by_vector_new(Vector_.new([1/2 * width, 1/2 * heigth, 0]));

        return adjusted_pos;
    }

    public update_its_position(delta: Vector<3>): void 
    {
        this.__container.__.update_position_by_delta(delta);
    }

    public update_the_positions_of_its_children_ligatures_and_update_relative_positions_of_its_children_containers(delta: Vector<3>): void 
    {
        this.__container.node.children.forEach((unit: Unit_Node) => 
        {
            if (unit.container) unit.container.positions.rel_root.__.substract_by_vector(delta);

            if (unit.ligature) unit.ligature.__.update_ratio();
        });
    }

    public update_positions_of_its_parents_ligatures(): void 
    {
        this.__container.node.parent.ligature?.__.update_ratio();
    }
}
