

export class Aside_Memory
{
    public current_view: Aside_Current_View = Aside_Current_View.MENU;
    
    public readonly stack_roots_visited_ids: string[] = [];
}

export enum Aside_Current_View
{
  MENU,
  BACK_VIEW,
  CHOOSE_ROOT,
  PAGINATE,
  LINK_ROOTS
}
