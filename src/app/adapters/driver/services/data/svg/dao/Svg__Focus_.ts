import { Container } from "../../../../../../core/domain/entities/Container";
import { Ligature } from "../../../../../../core/domain/entities/Ligature";
import { Svg_Memory } from "../Svg_Memory";


export class Svg__Focus_ 
{
  constructor(private readonly __memory: Svg_Memory) { }

  public set_this_container_on_focus(container: Container) 
  {
    this.__memory.focus_container = container;
    this.__memory.focus_ligature = null;
  }

  public set_this_ligature_on_focus(ligature: Ligature) 
  {
    this.__memory.focus_container = null;
    this.__memory.focus_ligature = ligature;
  }

  public reset() 
  {
    this.__memory.focus_container = null;
    this.__memory.focus_ligature = null;
  }

  public is_there_a_container_on_focus(): boolean 
  {
    return this.__memory.focus_container === null ? false : true;
  }

  public container_on_focus(): Container 
  {
    if (this.__memory.focus_container == null) throw new Error("No Container is currently on focus");

    return this.__memory.focus_container;
  }

  public get_nullable_container_on_focus(): Container | null 
  {
    return this.__memory.focus_container;
  }

  public ligature_on_focus(): Ligature 
  {
    if (this.__memory.focus_ligature == null) throw new Error("No Ligature is currently on focus");

    return this.__memory.focus_ligature;
  }

  public get_nullable_ligature_on_focus(): Ligature | null 
  {
    return this.__memory.focus_ligature;
  }
}
