import { Observer } from "../../../../../../core/common/Observer/Observer";
import { Ptr } from "../../../../../../core/common/Ptr";
import { Svg_Current_Event, Svg_Memory } from "../memory/Svg_Memory";

export class Svg_Current_Event_ 
{
  constructor(private readonly __memory: Svg_Memory) { }

  public set_is_zooming_up(): void 
  {
    this.__memory.current_event._ = Svg_Current_Event.ZOOMING_UP;
  }

  public set_is_zooming_down(): void 
  {
    this.__memory.current_event._ = Svg_Current_Event.ZOOMING_DOWN;
  }

  public set_is_view_moving_rigth(): void 
  {
    this.__memory.current_event._  = Svg_Current_Event.VIEW_MOVING_RIGTH;
  }

  public set_is_view_moving_left(): void 
  {
    this.__memory.current_event._  = Svg_Current_Event.VIEW_MOVING_LEFT;
  }

  public set_is_view_moving_up(): void 
  {
    this.__memory.current_event._  = Svg_Current_Event.VIEW_MOVING_UP;
  }

  public set_is_view_moving_down(): void 
  {
    this.__memory.current_event._  = Svg_Current_Event.VIEW_MOVING_DOWN;
  }

  public set_is_linking_roots(): void 
  {
    this.__memory.current_event._  = Svg_Current_Event.LINKING_ROOTS;
  }

  public set_current_event_to_none() : void
  {
    this.__memory.current_event._  = Svg_Current_Event.NONE;
  }

  public set_is_choosing_root() : void
  {
    this.__memory.current_event._  = Svg_Current_Event.CHOOSING_ROOT;
  }

  public is_zooming(): boolean 
  {
    return this.__memory.current_event._  == Svg_Current_Event.ZOOMING_UP || this.__memory.current_event._  == Svg_Current_Event.ZOOMING_DOWN ? true : false;
  }

  public is_there_a_current_event_running(): boolean 
  {    
    return this.__memory.current_event._ == Svg_Current_Event.NONE ? false : true;
  }

  public is_view_moving(): boolean 
  {
    return this.__memory.current_event._  == Svg_Current_Event.VIEW_MOVING_LEFT
      || this.__memory.current_event._  == Svg_Current_Event.VIEW_MOVING_RIGTH
      || this.__memory.current_event._  == Svg_Current_Event.VIEW_MOVING_UP
      || this.__memory.current_event._  == Svg_Current_Event.VIEW_MOVING_DOWN
      ? true : false;
  }

  public is_linking_roots(): boolean 
  {
    return this.__memory.current_event._  == Svg_Current_Event.LINKING_ROOTS ? true : false;
  }

  public get current_event_ptr() : Ptr<Svg_Current_Event>
  {
    return this.__memory.current_event;
  }
}
