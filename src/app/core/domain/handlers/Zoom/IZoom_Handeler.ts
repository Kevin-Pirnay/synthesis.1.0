import { IZoom_Positions } from "../../use_cases/Zoom";

export interface IZoom_Handeler
{
    zoom(positions: IZoom_Positions[], factor: number): void;
}