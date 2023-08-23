import { IDto } from "../../../port/driver/dto/IDto";
import { Indexes } from "../../handlers/handlers_use_case/Indexes/Indexes";
import { IData_Tree } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";
import { ILink_Roots_Repository } from "../interfaces/IRepository";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { Rotate_On_Target, Zoom_And_Rotate_Inputs } from "../../handlers/handlers_use_case/On_Target/Rotate_On_Target";
import { IZoom_Handler } from "../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { IChange_Flow_Handler } from "../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler";
import { Observer } from "../../../common/Observer/Observer";
import { Vector_ } from "../../../common/Vector/Vector_";


export class Link_Roots_Repository implements ILink_Roots_Repository
{
    private readonly __dao_flow : IDao_Flow;

    private readonly __indexes : Indexes;
    private __flows : string[] = [];
    private __current_flow : string = "";

    constructor(dao_flow : IDao_Flow) 
    {
        this.__dao_flow = dao_flow;
        this.__indexes = new Indexes();
    }
    
    public get_link_roots_data(indexes: number[], change_flow_handler : IChange_Flow_Handler, zoom_handler : IZoom_Handler): ILink_Roots 
    {
        return new Link_Roots(indexes, this.__flows, change_flow_handler, zoom_handler);
    }

    public init_indexes(): number 
    {
        return this.__indexes.init_indexes(this.__flows.length);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }

    public store_all_subtrees_root(): void 
    {
        this.__current_flow = this.__dao_flow.get_current_flow();
        this.__flows.push(this.__current_flow);
        this.__flows = this.__dao_flow.get_all_flows().filter(flow => flow !== this.__current_flow);
    }
}

class Link_Roots implements ILink_Roots
{
    private readonly __current : ILink_Flow;
    private readonly __next : ILink_Flow;

    constructor(indexes: number[], flows : string[], change_flow_handler : IChange_Flow_Handler, zoom_handler : IZoom_Handler) 
    {        
        this.__current = new Link_Root(flows[indexes[0]], change_flow_handler, zoom_handler);
        this.__next = new Link_Root(flows[indexes[1]], change_flow_handler, zoom_handler);
    }

    public async anim(observer : Observer<IDto[]>): Promise<void>
    {
        //problem : you cannot put two flow on the same time because of the container **ptr that are possibly in two different flow => confusion between ptr of multiflow
        //need to use an observer -> handle that as a stream

        this.__current.init(observer);
        await this.__current.rotate_and_zoom();

        this.__next.init(observer);
        await this.__next.rotate_and_zoom();
    }  
}

interface ILink_Flow
{
    rotate_and_zoom() : Promise<void>;
    init(observer : Observer<IDto[]>) : void;
}

class Link_Root implements ILink_Flow
{
    private __inputs : Zoom_And_Rotate_Inputs | null = null;

    constructor(
        private readonly __flow : string, 
        private readonly __change_flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler
    ){ }

    public init(observer : Observer<IDto[]>): void 
    {
        const x = 100;
        
        const axe_rotation = Vector_.new([x, 0, 0]);
        
        const max_angle = 90;
        
        const center_rotation = Vector_.new([250, 250, x]);
        
        const phase = 3 * Math.PI / 2;
        
        const delta_level = 50;
        
        const direction = 1;

        //************************************************************************ */

        const data : IData_Tree[] = this.__change_flow_handler.change_flow_and_get_subtree_from_the_root(this.__flow);

        this.__inputs = new Zoom_And_Rotate_Inputs(data, delta_level, axe_rotation, center_rotation, max_angle, phase, direction, this.__zoom_handler);

        observer.send(data);
    }
    
    public async rotate_and_zoom(): Promise<void>
    {
        if(! this.__inputs) throw new Error("No inputs was given");

        const positions = new Rotate_On_Target(this.__inputs);

        await positions.zoom_and_rotate();
    }
}