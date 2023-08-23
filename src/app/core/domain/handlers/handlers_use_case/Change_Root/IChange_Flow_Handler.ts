import { IDto } from "../../../../port/driver/dto/IDto";
import { Container } from "../../../entities/Container";

export interface IChange_Flow_Handler
{
    merge_subtrees_of_different_flows(container_to_link: Container, container_to_merge: Container, __origin_flow: string): IDto[];
    change_flow_and_get_subtree_from_the_root(flow : string) : IDto[];
}