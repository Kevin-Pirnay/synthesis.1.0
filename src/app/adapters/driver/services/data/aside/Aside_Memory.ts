import { Ptr } from "../../../../../core/common/Ptr";


export class Aside_Memory
{
    public current_view: Ptr<Aside_Current_View> = new Ptr(Aside_Current_View.MENU);

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
