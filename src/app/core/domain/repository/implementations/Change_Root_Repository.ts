import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { IChange_Root_Repository } from "../interfaces/IChange_Root_Repository";

export class Change_Root_Repository implements IChange_Root_Repository
{
    constructor(
        private __container_dao : IDao_Container,
        private __ligature_dao : IDao_Ligature,
        private __flow_dao : IDao_Flow
    ) { }

    public change_current_flow(flow: string): void 
    {
        this.__flow_dao.change_current_flow(flow);
        this.__ligature_dao.update_all_ptr_to_the_current_flow();
        this.__container_dao.update_all_ptr_to_the_current_flow();
    }

    public get_root_container(): Container 
    {
        return this.__container_dao.get_root_flow()
    }
    
    public get_current_flow(): string 
    {
        return this.__flow_dao.get_current_flow();
    }

    public get_all_flows(): string[] 
    {
        return this.__flow_dao.get_all_flows();
    }
}