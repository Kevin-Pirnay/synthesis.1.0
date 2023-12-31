import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { IView_As_Root_Repository } from '../interfaces/IRepository';
import { Subtree_Data } from './injectors/Subtree_Data';
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';
import { ISubtree_Root } from "../../handlers/handlers_use_case/View_As_Root/ISubtree_Root";


export class View_As_Root_Repository implements IView_As_Root_Repository
{   
    constructor(private readonly __dao_container : IDao_Container) { }

    public get_default_position_of_the_root(): Vector<3> 
    {
        return this.__dao_container.get_default_position_of_the_root();
    }

    public get_subtree_root(container: Container): ISubtree_Root 
    {
        return new Subtree_Data(null, container);
    }

    public get_subtree_root_by_id(container_id: string): ISubtree_Root 
    {
        const container : Container = this.__dao_container.get_container_by_id_for_the_current_flow(container_id);

        return this.get_subtree_root(container);
    }

    public get_subtree_root_from_root_flow(): ISubtree_Root 
    {
        const root_flow : Container = this.__dao_container.get_root_container_of_the_current_flow();

        return new Subtree_Data(null, root_flow);
    }

    public get_subtree_root_from_root_of_this_flow(flow : string): ISubtree_Root 
    {
        const root_flow : Container = this.__dao_container.get_root_container_of_this_flow(flow);

        return new Subtree_Data(null, root_flow);
    }
}

