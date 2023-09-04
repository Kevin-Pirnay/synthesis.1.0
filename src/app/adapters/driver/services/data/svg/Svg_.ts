import { Svg_Current_Event_ } from "./Svg_Current_Event_";
import { Svg_Memory } from "./Svg_Memory";
import { Svg__Dtos_ } from "./Svg__Dtos_";
import { Svg__Focus_ } from "./Svg__Focus_";
import { Svg__Mouse_ } from "./Svg__Mouse_";


export class Svg_ 
{
  public readonly mouse: Svg__Mouse_;
  public readonly focus: Svg__Focus_;
  public readonly current_event: Svg_Current_Event_;
  public readonly dtos: Svg__Dtos_;

  constructor(memory : Svg_Memory) 
  {
    this.focus = new Svg__Focus_(memory);
    this.mouse = new Svg__Mouse_(memory, this.focus);
    this.current_event = new Svg_Current_Event_(memory);
    this.dtos = new Svg__Dtos_(memory);
  }
}
