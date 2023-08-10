import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Dto } from "../../../port/driver/dto/Dto";
import { Data_Type, IDto } from "../../../port/driver/dto/IDto";
import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ISubtree_Root } from "../../handlers/View_As_Root/View_As_Root_Handler";
import { IView_As_Root_Repository } from "../interfaces/IView_As_Root_Repository";

export class View_As_Root_Repository implements IView_As_Root_Repository
{
    constructor(private readonly __dao_container : IDao_Container, private readonly __dao__ligature : IDao_Ligature) { }

    public conform_container(container_id: string): Container 
    {
        return this.__dao_container.get_by_id(container_id);
    }

    public conform_ligature(ligature_id: string): Ligature 
    {
        return this.__dao__ligature.get_by_id(ligature_id);
    }
    
    public get_default_root_pos(): Vector 
    {
        //****  change that *****
        return Vector_.new([100,250]);
    }

    public get_root_subtree(container: Container): ISubtree_Root 
    {
        return new Subtree_Data(null, container, this);
    }
}

class Subtree_Data implements ISubtree_Root
{
    constructor(private readonly __ligature : Ligature | null, private readonly __container : Container, private readonly __repository : IView_As_Root_Repository) 
    { 
        if(__ligature) this.__ligature = __repository.conform_ligature(__ligature.id);
        this.__container = __repository.conform_container(__container.id);
    }

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

        for(let i = 0; i < this.__container.node.children.length; i++) 
        {
            const unit = this.__container.node.children[i];

            if(!unit.container) continue;
    
            result.push(new Subtree_Data(unit.ligature, unit.container, this.__repository));
        }

        return result;
    }

    public set_children_positions(children: ISubtree_Root[]): void 
    {
        const parent_root_pos : Vector = this.__container.positions.abs_root;

        children.forEach(child => child.set_its_positions(parent_root_pos));
    }
}