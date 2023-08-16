import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Container } from "../../entities/Container";
import { ISubtree_Root } from '../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler';
import { IView_As_Root_Repository } from '../interfaces/IRepository';
import { Subtree_Data } from './injectors/Subtree_Data';
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';


export class View_As_Root_Repository implements IView_As_Root_Repository
{   
    constructor(private readonly __dao_container : IDao_Container) { }

    public get_default_position_of_the_root(): Vector 
    {
        //****  change that *****
        return this.__dao_container.get_default_position_of_the_root();
        //return Vector_.new([100,250]);
    }

    public get_subtree_root(container: Container): ISubtree_Root 
    {
        return new Subtree_Data(null, container);
    }
}

