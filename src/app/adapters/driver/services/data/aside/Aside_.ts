import { Aside_Memory } from "./memory/Aside_Memory";
import { Aside__Back_View_ } from "./dao/Aside__Back_View_";
import { Aside__Current_View_ } from "./dao/Aside__Current_View_";



export class Aside_ 
{
  public readonly current_view: Aside__Current_View_;
  public readonly back_view : Aside__Back_View_;

  constructor(memory: Aside_Memory) 
  {
    this.current_view = new Aside__Current_View_(memory);
    this.back_view = new Aside__Back_View_(memory);
  }
}
