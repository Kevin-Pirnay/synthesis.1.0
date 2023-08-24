import { IDto } from "../../../port/driver/dto/IDto";
import { Indexes } from "../../handlers/handlers_use_case/Indexes/Indexes";
import { ILink_Roots } from "../../use_cases/Link_Root/Init_Link_Roots";
import { ILink_Roots_Repository } from "../interfaces/IRepository";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IZoom_Handler } from "../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { IChange_Flow_Handler } from "../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler";
import { IDao_Anim } from "../../../port/driven/dao/IDao_Anim";
import { Container } from "../../entities/Container";
import { Link_Roots } from "./injectors/Link_Roots";
import { Inputs_Init_Link_Root } from "./injectors/Link_Roots";


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

        const unwanted_flows : string[] = this.__dao_flow.get_all_flows_related_to_the_current_flow(this.__origin_flow);

        this.__flows = this.__dao_flow.get_all_flows().filter((flow : string )=> flow !== this.__origin_flow);

        this.__flows = this.__flows.filter((flow : string) => !unwanted_flows.includes(flow));
    }

    public links_subtrees(container: Container, change_flow_handler : IChange_Flow_Handler): IDto[] 
    {
        if ( this.__container_to_link == null ) throw new Error("container to link has not been set");

        const dtos : IDto[] = change_flow_handler.merge_subtrees_of_different_flows(this.__container_to_link, container, this.__origin_flow);

        return dtos;
    }
}

