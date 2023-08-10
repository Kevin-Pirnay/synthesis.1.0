import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { Container } from "../../entities/Container";
import { IChange_Root_Repository } from "../interfaces/IChange_Root_Repository";

export class Change_Root_Repository implements IChange_Root_Repository
{
    constructor(private __container_dao : IDao_Container) { }
    
    public get_root_container(flow: string): Container 
    {
        throw new Error("Method not implemented.");
    } 
}