import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Dto } from "../../../port/driver/dto/Dto";
import { Data_Type, IDto } from "../../../port/driver/dto/IDto";
import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ISubtree_Root } from "../../handlers/View_As_Root/View_As_Root_Handler";
import { IView_As_Root_Repository } from "../interfaces/IView_As_Root_Repository";

export class View_As_Root_Repository implements IView_As_Root_Repository
{
    public get_default_root_pos(): Vector 
    {
        return Vector_.new([100,250]);
    }

    public get_root_subtree(container: Container): ISubtree_Root 
    {
        return new Subtree_Data(null, container);
    }
}

class Subtree_Data implements ISubtree_Root
{
    constructor(private readonly __ligature : Ligature | null, private readonly __container : Container) { }

    public add_children_to_the_frontier(frontier: ISubtree_Root[], children: ISubtree_Root[]): void 
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
        result.push(new Dto(this.__container, Data_Type.CONTAINER));
        
        if(this.__ligature) result.push(new Dto(this.__ligature, Data_Type.LIGATURE));
    }

    public get_his_children(): ISubtree_Root[] 
    {
        const result : ISubtree_Root[] = [];

        this.__container.node.children.forEach((unit : Unit_Node) =>
        {
            result.push(new Subtree_Data(unit.ligature, unit.container));
        });

        return result;
    }

    public set_children_positions(children: ISubtree_Root[]): void 
    {
        const parent_root_pos : Vector = this.__container.positions.abs_root;

        children.forEach(child => child.set_its_positions(parent_root_pos));
    }
}