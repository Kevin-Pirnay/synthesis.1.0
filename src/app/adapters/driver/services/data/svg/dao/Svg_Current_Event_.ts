import { Svg_Current_Event, Svg_Memory } from "../Svg_Memory";

export class Svg_Current_Event_ 
{
  constructor(private readonly __memory: Svg_Memory) { }

  public set_is_zooming(): void 
  {
    this.__memory.current_event = Svg_Current_Event.ZOOMING;
  }

  public set_is_view_moving_rigth(): void 
  {
    this.__memory.current_event  = Svg_Current_Event.VIEW_MOVING_RIGTH;
  }

  public set_is_view_moving_left(): void 
  {
    this.__memory.current_event  = Svg_Current_Event.VIEW_MOVING_LEFT;
  }

  public set_is_view_moving_up(): void 
  {
    this.__memory.current_event  = Svg_Current_Event.VIEW_MOVING_UP;
  }

  public set_is_view_moving_down(): void 
  {
    this.__memory.current_event  = Svg_Current_Event.VIEW_MOVING_DOWN;
  }

  public set_is_linking_roots(): void 
  {
    this.__memory.current_event  = Svg_Current_Event.LINKING_ROOTS;
  }

  public is_zooming(): boolean 
  {
    return this.__memory.current_event  == Svg_Current_Event.ZOOMING ? true : false;
  }

  public is_view_moving(): boolean 
  {
    return this.__memory.current_event  == Svg_Current_Event.VIEW_MOVING_LEFT
      || this.__memory.current_event  == Svg_Current_Event.VIEW_MOVING_RIGTH
      || this.__memory.current_event  == Svg_Current_Event.VIEW_MOVING_UP
      || this.__memory.current_event  == Svg_Current_Event.VIEW_MOVING_DOWN
      ? true : false;
  }

  public is_linking_roots(): boolean 
  {
    return this.__memory.current_event  == Svg_Current_Event.ZOOMING ? true : false;
  }
}