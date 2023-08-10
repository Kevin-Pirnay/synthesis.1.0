import { Container } from "../../entities/Container";

export interface IChange_Root_Repository
{
    get_root_container(flow : string): Container;

}