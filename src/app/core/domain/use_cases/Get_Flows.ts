import { Get_Flows_Response } from "../../port/driver/response/Get_Flows_Response";
import { IChange_Root_Repository } from "../repository/interfaces/IChange_Root_Repository";

export class Get_Flows_Use_case
{
    constructor(private __repository : IChange_Root_Repository) { }

    public handle() : Get_Flows_Response
    {
        const flows : string[] = this.__repository.get_all_flows();
        const current_flow : string = this.__repository.get_current_flow();
        return new Get_Flows_Response(flows, current_flow);
    }
}