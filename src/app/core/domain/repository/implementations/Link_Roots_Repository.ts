import { IDto } from "../../../port/driver/dto/IDto";
import { Indexes } from "../../handlers/handlers_use_case/Indexes/Indexes";
import { IData_Tree, ISubtree_Root } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";
import { ILink_Roots_Repository } from "../interfaces/IRepository";
import { Container } from '../../entities/Container';
import { Subtree_Data } from './injectors/Subtree_Data';
import { Matrix } from "../../../common/Matrix/Matrix";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";


export class Link_Roots_Repository implements ILink_Roots_Repository
{
    private readonly __dao_flow : IDao_Flow;
    private readonly __dao_container : IDao_Container;

    private readonly __indexes : Indexes;
    private readonly __subtrees_roots : ISubtree_Root[] = [];
    private __current_subtree : ISubtree_Root | null = null;

    constructor(dao_flow : IDao_Flow, dao_container : IDao_Container) 
    {
        this.__dao_flow = dao_flow;
        this.__dao_container = dao_container;
        this.__indexes = new Indexes();
    }
    
    public get_link_roots_data(indexes: number[], view_as_root_handler : IView_As_Root_Handler): ILink_Roots 
    {
        return new Link_Roots(indexes, this.__subtrees_roots, view_as_root_handler);
    }

    public init_indexes(): number 
    {
        return this.__indexes.init_indexes(this.__subtrees_roots.length);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }

    public store_all_subtrees_root(): void 
    {
        const all_flows : string[] = this.__dao_flow.get_all_flows();
        const current_flow : string = this.__dao_flow.get_current_flow();
        const flows : string[] = all_flows.filter(flow => flow !== current_flow);

        flows.forEach(flow => 
        {
            const root_container : Container = this.__dao_container.get_root_container(flow);
            const subtree_root =  new Subtree_Data(null, root_container);
            this.__subtrees_roots.push(subtree_root);
        });

        const current_root_container : Container =  this.__dao_container.get_root_container_of_the_current_flow();
        this.__current_subtree = new Subtree_Data(null, current_root_container);
    }
}


class Link_Roots implements ILink_Roots
{
    private readonly __current_link_root : ILink_Root;
    private readonly __next_link_root : ILink_Root;
    private readonly __dtos : IDto[] = [];

    constructor(indexes: number[], subtrees_roots : ISubtree_Root[], handler : IView_As_Root_Handler) 
    {
        //handle index -1
        const current_sunbtree : IData_Tree[] = handler.get_subtree_from_subtree_root(subtrees_roots[indexes[0]]);
        const next_sunbtree : IData_Tree[] = handler.get_subtree_from_subtree_root(subtrees_roots[indexes[1]]);

        current_sunbtree.forEach((data : IData_Tree) => this.__dtos.push(data));
        next_sunbtree.forEach((data : IData_Tree) => this.__dtos.push(data));

        this.__current_link_root = new Link_Root(current_sunbtree);
        this.__next_link_root = new Link_Root(next_sunbtree);
    }

    public anim(): IDto[] 
    {
        this.__current_link_root.unzoom_and_rotate();
        this.__next_link_root.rotate_and_zoom();
        return this.__dtos;
    }  
}

interface ILink_Root
{
    rotate_and_zoom(): void;
    unzoom_and_rotate(): void;
}

class Link_Root implements ILink_Root
{
    private readonly __positions : IData_Tree_Positions[] = [];

    constructor(data_tree : IData_Tree[])
    {
        data_tree.forEach(data => this.__positions.push(new Data_Tree_positions(data)));
    }

    public rotate_and_zoom(): void 
    {
        
    }
    public unzoom_and_rotate(): void 
    {
        throw new Error('Method not implemented.');
    }
}

interface IData_Tree_Positions
{

}

class Data_Tree_positions implements IData_Tree_Positions
{
    private readonly __abs_ratio : Matrix<any>;

    constructor(data_tree : IData_Tree)
    {
        this.__abs_ratio = data_tree.element.posiitions.abs_ratio;
    }
}

