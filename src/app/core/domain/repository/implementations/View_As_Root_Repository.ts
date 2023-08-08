import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Dto } from "../../../port/driver/dto/Dto";
import { Dto_Type, IDto } from "../../../port/driver/dto/IDto";
import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ISubtree_Data } from "../../use_cases/View_As_Root";
import { IView_As_Root_Repository } from "../interfaces/IView_As_Root_Repository";

export class View_As_Root_Repository implements IView_As_Root_Repository
{
    public get_default_root_pos(): Vector 
    {
        return Vector_.new([100,300]);
    }

    public get_root_subtree(container: Container): ISubtree_Data 
    {
        return new Subtree_Data(null, container);
    }
}

class Subtree_Data implements ISubtree_Data
{
    constructor(private readonly __ligature : Ligature | null, private readonly __container : Container) { }

    public add_children_to_the_frontier(frontier: ISubtree_Data[], children: ISubtree_Data[]): void 
    {
        children.forEach( child => frontier.unshift(child)); 
    }
    
    public set_its_positions(pos: Vector): void 
    {
        if(this.__ligature)
        {
            const c_abs_root = this.__container.positions.rel_root.__.add_by_vector_new(pos);
            this.__container.__.update_position_from_abs_root(c_abs_root);
            this.__ligature.__.update_ratio();
            //need to unzoom???
        }
        else this.__container.__.update_position_from_abs_root(pos);
    }

    public added_to_the_result(result: IDto[]): void 
    {
        result.push(new Dto(this.__container, Dto_Type.CONTAINER));
        if(this.__ligature) result.push(new Dto(this.__ligature, Dto_Type.LIGATURE));
    }

    public get_his_children(): ISubtree_Data[] 
    {
        const result : ISubtree_Data[] = [];

        this.__container.node.children.forEach((unit : Unit_Node) =>
        {
            result.push(new Subtree_Data(unit.ligature, unit.container));
        });

        return result;
    }

    public set_children_positions(children: ISubtree_Data[]): void 
    {
        const parent_root_pos : Vector = this.__container.positions.abs_root;

        children.forEach(child => child.set_its_positions(parent_root_pos));
    }
}