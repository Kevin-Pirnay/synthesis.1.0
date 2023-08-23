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
import { Vector } from "../../../common/Vector/Vector";
import { IDao_Anim } from "../../../port/driven/dao/IDao_Anim";
import { Container } from "../../entities/Container";


export class Link_Roots_Repository implements ILink_Roots_Repository
{
    private readonly __indexes : Indexes;
    private __flows : string[] = [];
    private __origin_flow : string = "";
    private __container_to_link : Container | null = null;

    constructor(private readonly __dao_flow : IDao_Flow, private readonly __dao_anim : IDao_Anim) 
    {
        this.__indexes = new Indexes();
    }

    public store_container_to_link(container : Container): void 
    {
        this.__container_to_link = container;
    }
    
    public get_link_roots_data(indexes: number[], change_flow_handler : IChange_Flow_Handler, zoom_handler : IZoom_Handler): ILink_Roots 
    {
        const inputs_current : Inputs_Init_Link_Root = this.__dao_anim.get_inputs_init_link_roots_for_current();

        const inputs_next : Inputs_Init_Link_Root = this.__dao_anim.get_inputs_init_link_roots_for_next();

        return new Link_Roots(indexes, this.__flows, inputs_current, inputs_next, change_flow_handler, zoom_handler);
    }

    public init_indexes(): number 
    {
        return this.__indexes.init_indexes(this.__flows.length);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }

    public store_all_possible_flow(): void 
    {
        this.__origin_flow = this.__dao_flow.get_current_flow();

        this.__flows.push(this.__origin_flow);

        this.__flows = this.__dao_flow.get_all_flows().filter(flow => flow !== this.__origin_flow);
    }

    public links_subtrees(container: Container, change_flow_handler : IChange_Flow_Handler): IDto[] 
    {
        if ( this.__container_to_link == null ) throw new Error("container to link has not been set");

        const dtos : IDto[] = change_flow_handler.merge_subtrees_of_different_flows(this.__container_to_link, container, this.__origin_flow);

        return dtos;
    }
}

class Link_Roots implements ILink_Roots
{
    private readonly __current : ILink_Flow;
    private readonly __next : ILink_Flow;

    constructor(indexes: number[], flows : string[], inputs_current : Inputs_Init_Link_Root, inputs_next : Inputs_Init_Link_Root, change_flow_handler : IChange_Flow_Handler, zoom_handler : IZoom_Handler) 
    {        
        this.__current = new Link_Root(flows[indexes[0]], inputs_current, change_flow_handler, zoom_handler);
        
        this.__next = new Link_Root(flows[indexes[1]], inputs_next, change_flow_handler, zoom_handler);
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

export class Inputs_Init_Link_Root
{
    constructor(
        public readonly delta_level : number,
        public readonly axe_rotation : Vector<3>,
        public readonly max_angle : number,
        public readonly center_rotation : Vector<3>,
        public readonly phase : number,
        public readonly direction : number
    ){ }
}

class Link_Root implements ILink_Flow
{
    private __inputs__ : Zoom_And_Rotate_Inputs | null = null;

    constructor(
        private readonly __flow : string, 
        private readonly __inputs : Inputs_Init_Link_Root,
        private readonly __change_flow_handler : IChange_Flow_Handler, 
        private readonly __zoom_handler : IZoom_Handler
    ){ }

    public init(observer : Observer<IDto[]>): void 
    {
        const data : IData_Tree[] = this.__change_flow_handler.change_flow_and_get_subtree_from_the_root(this.__flow);

        this.__inputs__ = new Zoom_And_Rotate_Inputs(
            data, 
            this.__inputs.delta_level, 
            this.__inputs.axe_rotation, 
            this.__inputs.center_rotation, 
            this.__inputs.max_angle, 
            this.__inputs.phase, 
            this.__inputs.direction, 
            this.__zoom_handler
        );

        observer.send(data);
    }
    
    public async rotate_and_zoom(): Promise<void>
    {
        if(! this.__inputs__) throw new Error("No inputs was given");

        const positions = new Rotate_On_Target(this.__inputs__);

        await positions.zoom_and_rotate();
    }
}