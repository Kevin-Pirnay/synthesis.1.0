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

    public is_mouse_down_on_cursor() : boolean
    {
        return this.__memory.mouse_current_state._ == Navigation_Zoom_Mouse_State.DOWN_ON_CURSOR ? true : false;
    }

    public increment_cursor_position() : void
    {
        if(this.__memory.cursor_position._ == null || this.__memory.step_slider == null) throw new Error("memory navigation slider data was not initialized. Need to call init_slider_data");

        this.__memory.cursor_position._ += this.__memory.step_slider;
    }

    public decrement_cursor_position() : void
    {
        if(this.__memory.cursor_position._ == null || this.__memory.step_slider == null) throw new Error("memory navigation slider data was not initialized. Need to call init_slider_data");

        this.__memory.cursor_position._ -= this.__memory.step_slider;
    }

    public init_slider_data(origin_slider : number, size_slider : number) : void
    {
        this.__memory.origin_slider = origin_slider;

        this.__memory.step_slider = size_slider / this.__memory.nb_step_slider;

        if ( this.__memory.cursor_position._ == null ) this.__memory.cursor_position._ = 50 * this.__memory.step_slider;
    }

    public get mouse_state_ptr() : Ptr<Navigation_Zoom_Mouse_State>
    {
        return this.__memory.mouse_current_state;
    }

    public get cursor_position_ptr() : Ptr<number>
    {
        return this.__memory.cursor_position;
    }

    public get_current_cursor_mouse_position() : number
    {
        if(this.__memory.origin_slider == null || this.__memory.cursor_position._ == null) throw new Error("memory navigation slider data was not initialized. Need to call init_slider_data");

        return this.__memory.origin_slider + this.__memory.cursor_position._;
    }
}