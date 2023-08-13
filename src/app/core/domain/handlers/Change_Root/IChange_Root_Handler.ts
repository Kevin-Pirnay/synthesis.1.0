import { IDto } from "../../../port/driver/dto/IDto";

export interface IChange_Root_Handler
{
    change_root(flow : string) : IDto[];
}