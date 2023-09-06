import { Ptr } from "../../../../../../core/common/Ptr";


export class Aside_Memory
{
    public current_view: Ptr<Aside_Current_View> = new Ptr(Aside_Current_View.NONE);

    public readonly stack_roots_ids_visited: string[] = [];
}

export enum Aside_Current_View
{
  BACK_VIEW = 0,
  CHOOSE_ROOT = 1,
  PAGINATE = 2,
  LINK_ROOTS = 3,
  NONE = 4
}
