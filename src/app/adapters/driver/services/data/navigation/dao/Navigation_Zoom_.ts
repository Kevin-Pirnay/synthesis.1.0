import { Ptr } from "../../../../../../core/common/Ptr";
import { Navigation_Memory, Navigation_Zoom_Mouse_State } from "../memory/Navigation_Memory";

export class Navigation_Zoom_
{
    constructor(private readonly __memory : Navigation_Memory) { }

    public set_mouse_is_down_on_cursor() : void
    {
        this.__memory.mouse_current_state._ = Navigation_Zoom_Mouse_State.DOWN_ON_CURSOR;
    }

    public set_mouse_is_up() : void
    {
        this.__memory.mouse_current_state._ = Navigation_Zoom_Mouse_State.UP;

    }

    public set_mouse_is_mouving_to_the_rigth() : void
    {
        this.__memory.mouse_current_state._ = Navigation_Zoom_Mouse_State.MOVING_TO_THE_RIGTH;
    }

    public set_mouse_is_mouving_to_the_left() : void
    {
        this.__memory.mouse_current_state._ = Navigation_Zoom_Mouse_State.MOVING_TO_THE_LEFT;
    }

    public increment_cursor_position() : void
    {
        if(this.__memory.cursor_position._ == null) throw new Error("memory cursor_position was not initialized");

        this.__memory.cursor_position._ ++;
    }

    public decrement_cursor_position() : void
    {
        if(this.__memory.cursor_position._ == null) throw new Error("memory cursor_position was not initialized");

        this.__memory.cursor_position._ --;
    }

    public init_cursor_mouse_position(position : number) : void
    {
        this.__memory.cursor_mouse_position._ = position;
    }

    public get mouse_state_ptr() : Ptr<Navigation_Zoom_Mouse_State>
    {
        return this.__memory.mouse_current_state;
    }

    public get cursor_position_ptr() : Ptr<number>
    {
        return this.__memory.cursor_position;
    }

    public get current_mouse_position() : number
    {
        if (this.__memory.cursor_mouse_position._ == null) throw new Error("memory navigation cursor_mouse_position was not initialized");

        return this.__memory.cursor_mouse_position._;
    }
}