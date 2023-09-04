import { Svg_ } from "./Svg_";
import { Svg_Memory } from "./memory/Svg_Memory";


export class Svg 
{
  public readonly __ : Svg_;
  
  private readonly __memory : Svg_Memory;

  constructor()
  {
    this.__memory = new Svg_Memory();

    this.__ = new Svg_(this.__memory);
  } 
}
