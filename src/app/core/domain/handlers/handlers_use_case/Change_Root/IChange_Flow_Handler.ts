import { IDto } from "../../../../port/driver/dto/IDto";

export interface IChange_Flow_Handler
{
    change_flow_and_get_subtree_from_the_root(flow : string) : IDto[];
}