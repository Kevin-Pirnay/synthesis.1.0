import { Aside_Memory } from "./memory/Aside_Memory";
import { Aside__Stack_Roots_Ids_ } from "./dao/Aside__Stack_Roots_Ids_";
import { Aside__Current_View_ } from "./dao/Aside__Current_View_";



export class Aside_ 
{
  public readonly current_view: Aside__Current_View_;
  public readonly stack_roots_ids : Aside__Stack_Roots_Ids_;

  constructor(memory: Aside_Memory) 
  {
    this.current_view = new Aside__Current_View_(memory);
    this.stack_roots_ids = new Aside__Stack_Roots_Ids_(memory);
  }
}
