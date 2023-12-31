import { Vector } from "../../../../common/Vector/Vector";
import { Dto } from "../../../../port/driver/dto/Dto";
import { IDto } from "../../../../port/driver/dto/IDto";
import { Data_Type } from "../../../entities/Data_Type";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { ISubtree_Root } from "../../../handlers/handlers_use_case/View_As_Root/ISubtree_Root";


export class Subtree_Data implements ISubtree_Root 
{
    constructor(private readonly __ligature: Ligature | null, private readonly __container: Container) { }

    public add_children_to_the_frontier(frontier: ISubtree_Root[], children: ISubtree_Root[]): void 
    {
        children.forEach(child => frontier.unshift(child));
    }

    public set_its_positions(pos: Vector<3>): void 
    {
        if ( this.__ligature ) 
        {
            const c_abs_root = this.__container.positions.rel_root.__.add_by_vector_new(pos);

            this.__container.__.update_position_from_abs_root(c_abs_root);
            
            this.__ligature.__.update_ratio();
        }

        else this.__container.__.update_position_from_abs_root(pos);
    }

    public added_to_the_result(result: IDto[]): void 
    {
        result.push(new Dto(this.__container, Data_Type.CONTAINER));

        if (this.__ligature) result.push(new Dto(this.__ligature, Data_Type.LIGATURE));
    }

    public get_his_children(): ISubtree_Root[] 
    {
        const result: ISubtree_Root[] = [];

        for (let i = 0; i < this.__container.node.children.length; i++) 
        {
            const unit = this.__container.node.children[i];

            if (!unit.container) continue;

            result.push(new Subtree_Data(unit.ligature, unit.container));
        }

        return result;
    }

    public set_children_positions(children: ISubtree_Root[]): void 
    {
        const parent_root_pos: Vector<3> = this.__container.positions.abs_root;

        children.forEach(child => child.set_its_positions(parent_root_pos));
    }
}
