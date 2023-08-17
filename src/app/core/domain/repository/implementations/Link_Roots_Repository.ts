import { IView_As_Root_Handler } from './../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';
import { Dao_Flow } from "../../../../adapters/driven/dao/Dao_Flow";
import { IDto } from "../../../port/driver/dto/IDto";
import { Indexes } from "../../handlers/handlers_use_case/Indexes/Indexes";
import { ISubtree_Root } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";
import { ILink_Roots_Repository } from "../interfaces/IRepository";
import { Container } from '../../entities/Container';
import { Dao_Container } from '../../../../adapters/driven/dao/Dao_Container';
import { Subtree_Data } from './injectors/Subtree_Data';


export class Link_Roots_Repository implements ILink_Roots_Repository
{
    private readonly __dao_flow : Dao_Flow;
    private readonly __dao_container : Dao_Container;

    private readonly __indexes : Indexes;
    private readonly __subtrees_roots : ISubtree_Root[] = [];

    constructor(dao_flow : Dao_Flow, dao_container : Dao_Container) 
    {
        this.__dao_flow = dao_flow;
        this.__dao_container = dao_container;
        this.__indexes = new Indexes();
    }
    
    public get_link_roots_data(indexes: number[]): ILink_Roots 
    {
        throw new Error("Method not implemented.");
    }

    public init_indexes(): number 
    {
        return this.__indexes.init_indexes(this.__subtrees_roots.length);
    }

    public store_all_subtrees_root(): void 
    {
        const all_flows : string[] = this.__dao_flow.get_all_flows();
        const current_flow = this.__dao_flow.get_current_flow();
        const flows = all_flows.filter(flow => flow !== current_flow);

        flows.forEach(flow => 
        {
            const root_container : Container = this.__dao_container.get_root_container(flow);
            const subtree_root =  new Subtree_Data(null, root_container);
            this.__subtrees_roots.push(subtree_root);
        });
    }
}


class Link_Roots implements ILink_Roots
{
    private readonly __current_link_root : ILink_Root;
    private readonly __next_link_root : ILink_Root;

    constructor(indexes: number[], subtrees_roots : ISubtree_Root[]) 
    {

    }

    public anim(): IDto[] 
    {
        this.__current_link_root.unzoom_and_rotate();
        this.__next_link_root.zoom_and_rotate();
    }  
}

interface ILink_Root
{
    anim(): IDto[];
}

class Link_Root implements ILink_Root
{
    anim(): IDto[] 
    {
        throw new Error('Method not implemented.');
    }

}

