import { IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";

export interface IView_As_Root_Handler
{
    get_subtree_dtos(container : Container): IDto[];
    get_subtree_dtos_by_id(container_id : string) : IDto[];
}