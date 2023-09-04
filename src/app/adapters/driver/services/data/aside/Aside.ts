import { Aside_ } from "./Aside_";
import { Aside_Memory } from "./Aside_Memory";


export class Aside 
{
  public readonly __ : Aside_;

  private readonly __memory : Aside_Memory;

  constructor()
  {
    this.__memory = new Aside_Memory();

    this.__ = new Aside_(this.__memory);
  }
}