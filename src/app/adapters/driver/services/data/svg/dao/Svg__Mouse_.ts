
import { Container } from "../../../../../../core/domain/entities/Container";
import { Ligature } from "../../../../../../core/domain/entities/Ligature";
import { Svg_Memory, Svg_State_Mouse } from "../memory/Svg_Memory";
import { Svg__Focus_ } from "./Svg__Focus_";


export class Svg__Mouse_ 
{
  constructor(private readonly __memory : Svg_Memory, private readonly __focus : Svg__Focus_) { }

  public set_mouse_is_down_on_a_container(container: Container): void 
  {
    this.__focus.set_this_container_on_focus(container);
    this.__memory.mouse_current_state._ = Svg_State_Mouse.DOWN_ON_CONTAINER;
  }

  public set_mouse_is_down_on_a_root_choice(): void 
  {
    this.__focus.reset();
    this.__memory.mouse_current_state._ = Svg_State_Mouse.DOWN_ON_ROOT_CHOICE;
  }

  public set_mouse_is_up(): void 
  {
    this.__memory.mouse_current_state._ = Svg_State_Mouse.UP;
  }

  public set_mouse_is_down_on_a_ligature(ligature: Ligature): void 
  {
    this.__focus.set_this_ligature_on_focus(ligature);
    this.__memory.mouse_current_state._ = Svg_State_Mouse.DOWN_ON_LIGATURE;
  }

  public set_mouse_is_down_on_a_grip(ligature: Ligature): void 
  {
    this.__focus.set_this_ligature_on_focus(ligature);
    this.__memory.mouse_current_state._ = Svg_State_Mouse.DOWN_ON_GRIP;
  }

  public is_mouse_down_on_something(): boolean 
  {
    return this.__memory.mouse_current_state._ === Svg_State_Mouse.UP ? false : true;
  }

  public is_mouse_down_on_container(): boolean 
  {
    return this.__memory.mouse_current_state._ === Svg_State_Mouse.DOWN_ON_CONTAINER ? true : false;
  }

  public is_mouse_down_on_grip(): boolean 
  {
    return this.__memory.mouse_current_state._ === Svg_State_Mouse.DOWN_ON_GRIP ? true : false;
  }
}
