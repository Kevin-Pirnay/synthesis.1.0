import { Vector } from "../../../../common/Vector/Vector";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { Node_Linker } from "../../../handlers/handlers_use_case/Link_Node/Node_Linker";
import { IAssign_Ligature } from "../../../use_cases/Move_Ligature";

export class Assing_Ligature implements IAssign_Ligature 
{
    public static get_assign_ligature_injector(node_linker: Node_Linker, ligature: Ligature, container_to_assign: Container): IAssign_Ligature 
    {
        return new Assing_Ligature(node_linker, ligature, container_to_assign);
    }

    private readonly __node_linker: Node_Linker;
    private readonly __ligature: Ligature;
    private readonly __container_to_assign: Container;
    private readonly __child_container: Container;

    constructor(node_linker: Node_Linker, ligature: Ligature, container_to_assign: Container) 
    {
        this.__node_linker = node_linker;
        this.__ligature = ligature;
        this.__container_to_assign = container_to_assign;
        this.__child_container = this.__ligature.child;
    }

    public update_relationship_in_the_tree(): void 
    {
        this.__node_linker.remove_unit_from_parent(this.__child_container);
        this.__node_linker.remove_unit_from_child(this.__child_container);
        this.__node_linker.link_nodes(this.__container_to_assign, this.__ligature, this.__child_container);
        this.__ligature.parent = this.__container_to_assign;        
    }

    public update_its_own_position(): void 
    {
        this.__ligature.__.update_ratio();
    }

    public update_the_relative_position_of_its_child_container_to_the_new_parent_container(): void 
    {
        const rel_root: Vector<3> = this.__child_container.positions.rel_root;

        const delta_pos_from_parent: Vector<3> = this.__child_container.positions.abs_root.__.substract_by_vector_new(this.__container_to_assign.positions.abs_root);

        rel_root.__.assign_new_data(delta_pos_from_parent);
    }
}
