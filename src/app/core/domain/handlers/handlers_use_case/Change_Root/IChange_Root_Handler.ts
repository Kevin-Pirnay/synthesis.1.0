import { IDto } from "../../../../port/driver/dto/IDto";

export interface IChange_Root_Handler
{
    change_root(flow : string) : IDto[];
    //get_subtree_from_the_flow(flow: string) : IDto[]
}