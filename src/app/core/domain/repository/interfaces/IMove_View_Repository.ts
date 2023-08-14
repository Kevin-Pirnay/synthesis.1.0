import { IDto } from "../../../port/driver/dto/IDto";
import { IMove_View_Positions } from "../../use_cases/Move_View";

export interface IMove_View_Repository
{
    get_all_positions(): IMove_View_Positions[];
    get_positions(dtos : IDto[]) : IMove_View_Positions[];
}