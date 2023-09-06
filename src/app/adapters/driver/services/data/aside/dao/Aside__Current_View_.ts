import { Ptr } from "../../../../../../core/common/Ptr";
import { Aside_Current_View, Aside_Memory } from "../memory/Aside_Memory";


export class Aside__Current_View_ 
{
  constructor(private readonly __memory: Aside_Memory) { }

  public set_show_back_view(): void 
  {
    this.__memory.current_view._ = Aside_Current_View.BACK_VIEW;
  }

  public set_show_choose_root(): void 
  {
    this.__memory.current_view._ = Aside_Current_View.CHOOSE_ROOT;
  }

  public set_show_paginate(): void 
  {
    this.__memory.current_view._ = Aside_Current_View.PAGINATE;
  }

  public set_show_link_roots(): void 
  {
    this.__memory.current_view._ = Aside_Current_View.LINK_ROOTS;
  }

  public get current_view_ptr() : Ptr<Aside_Current_View>
  {
    return this.__memory.current_view;
  }
}
