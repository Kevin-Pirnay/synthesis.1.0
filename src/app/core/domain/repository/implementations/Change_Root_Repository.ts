import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { IChange_Root_Repository } from "../interfaces/IRepository";


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
        this.__ligature_dao.prepare_all_ptr_for_the_current_flow();
        this.__container_dao.prepare_all_ptr_for_the_current_flow();
    }

    public get_root_container_from_the_current_flow(): Container 
    {
        return this.__container_dao.get_root_container_of_the_current_flow();
    }
}