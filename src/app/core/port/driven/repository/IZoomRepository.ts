
export interface IZoomRepository
{
    update_zoom_factor(direction: number): number;
    get_zoom_factor() : number;
}