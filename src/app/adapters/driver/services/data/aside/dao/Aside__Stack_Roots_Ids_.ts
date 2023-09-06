import { Aside_Memory } from "../memory/Aside_Memory";


export class Aside__Stack_Roots_Ids_
{
  constructor(private readonly __memory : Aside_Memory) { }

  public add_id_to_the_stack_view_ids(id: string): void 
  {
    this.__memory.stack_roots_ids_visited.push(id);
  }

  public reset_the_stack_roots_ids() : void
  {
    this.__memory.stack_roots_ids_visited.length = 0;
  }

  public get stack_roots_ids_visited() : string[]
  {
    return this.__memory.stack_roots_ids_visited;
  }
}
