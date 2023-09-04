import { Aside } from "./Aside.1";
import { Aside_Current_View } from "./Aside";


export class Aside__Current_View_ {
  constructor(private readonly __aside: Aside) { }

  public set_show_back_view(): void {
    this.__aside.current_view.view = Aside_Current_View.BACK_VIEW;
  }
  public set_show_menu(): void {
    this.__aside.current_view.view = Aside_Current_View.MENU;
  }

  public set_show_choose_root(): void {
    this.__aside.current_view.view = Aside_Current_View.CHOOSE_ROOT;
  }

  public set_show_paginate(): void {
    this.__aside.current_view.view = Aside_Current_View.PAGINATE;
  }

  public set_show_link_roots(): void {
    this.__aside.current_view.view = Aside_Current_View.LINK_ROOTS;
  }
}
