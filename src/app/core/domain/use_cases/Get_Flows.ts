import { Get_Flows_Response } from "../../port/driver/response/Get_Flows_Response";
import { IGet_Flows_Repository } from "../repository/interfaces/IGet_Flows_Repository";

export class Get_Flows_Use_case
{
    constructor(private __get_flows_repository : IGet_Flows_Repository) { }

    public handle() : Get_Flows_Response
    {
        const flows : string[] = this.__get_flows_repository.get_all_flows();
        const current_flow : string = this.__get_flows_repository.get_current_flow();
        return new Get_Flows_Response(flows, current_flow);
    }
}