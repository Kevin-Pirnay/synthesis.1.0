

export enum Aside_Current_View
{
  MENU,
  BACK_VIEW,
  CHOOSE_ROOT,
  PAGINATE,
  LINK_ROOTS
}

export class Current_View
{
  public view : Aside_Current_View = Aside_Current_View.MENU;
}

export class Back_View
{
  public readonly stack_roots_visited_ids : string[] = [];

  public add_id_to_the_stack_view_ids(id : string) : void
  {
    this.stack_roots_visited_ids.push(id);
  }
}

