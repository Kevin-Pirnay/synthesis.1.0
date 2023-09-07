import { Ptr } from "../../../../../../core/common/Ptr";

export class Navigation_Memory
{
    public mouse_current_state : Ptr<Navigation_Zoom_Mouse_State> = new Ptr(Navigation_Zoom_Mouse_State.UP);
    public move_current_state : Ptr<Navigation_Zoom_Move_State> = new Ptr(Navigation_Zoom_Move_State.NONE);

    public readonly cursor_position : Ptr<number> = new Ptr(50);

    public origin_slider : number | null = null;

    public step_slider : number | null = null;

    public readonly nb_step_slider : number = 100;
}

export enum Navigation_Zoom_Mouse_State
{
    DOWN_ON_CURSOR,
    UP
}

export enum Navigation_Zoom_Move_State
{
    MOVING_TO_THE_LEFT,
    MOVING_TO_THE_RIGTH,
    NONE
}