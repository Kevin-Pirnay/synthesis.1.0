import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../port/driven/dao/IDao_Flow";
import { IGet_Flows_Repository } from "../interfaces/IGet_Flows_Repository";

export class Get_Flows_Repository implements IGet_Flows_Repository
{
    constructor(private __flow_dao : IDao_Flow) { }

    public get_current_flow(): string 
    {
        return this.__flow_dao.get_current_flow();
    }

    get_all_flows(): string[] 
    {
        return this.__flow_dao.get_all_flows();
    }
}