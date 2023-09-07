import { Ptr } from "../../../../../../core/common/Ptr";

export class Navigation_Memory
{
    public mouse_current_state : Ptr<Navigation_Zoom_Mouse_State> = new Ptr(Navigation_Zoom_Mouse_State.UP);

    public readonly cursor_position : Ptr<number> = new Ptr(50);

    public readonly cursor_mouse_position : Ptr<number> = new Ptr();
}

export enum Navigation_Zoom_Mouse_State
{
    MOVING_TO_THE_LEFT,
    MOVING_TO_THE_RIGTH,
    DOWN_ON_CURSOR,
    UP
}