import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { Container } from "../../entities/Container";
import { IChange_Root_Repository } from "../interfaces/IChange_Root_Repository";

export class Change_Root_Repository implements IChange_Root_Repository
{
    constructor(
        private __container_dao : IDao_Container,
        private __flow_dao : IDao_Flow
    ) { }

    public change_current_flow(flow: string): void 
    {
        this.__flow_dao.change_current_flow(flow);
    }

    public get_root_container(): Container 
    {
        return this.__container_dao.get_root_flow()
    } 
}