import { IZoomRepository } from "../../../core/port/driven/repository/IZoomRepository";

export class ZoomRepository implements IZoomRepository
{
    get_zoom_factor(): number {
        throw new Error("Method not implemented.");
    }
    update_zoom_factor(direction: number): number {
        throw new Error("Method not implemented.");
    }

}