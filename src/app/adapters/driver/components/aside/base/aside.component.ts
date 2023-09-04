import { DataService } from './../../../services/data/data.service';
import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';
import { Ptr } from '../../../../../core/common/Ptr';
import { Aside_Current_View } from '../../../services/data/aside/memory/Aside_Memory';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent 
{
  public readonly current_view : Ptr<Aside_Current_View>;

  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.current_view = data.aside.__.current_view.current_view_ptr;
  }

  public click_on_show_menu() : void
  {
    this.__state.from_aside.base.report_click_on_show_menu();
  }

  public click_on_show_back_view() : void
  {
    this.__state.from_aside.base.report_click_on_show_back_view();
  }

  public click_on_show_choose_root() : void
  {
    this.__state.from_aside.base.report_click_on_show_choose_root();
  }

  public click_on_show_paginate() : void
  {
    this.__state.from_aside.base.report_click_on_show_paginate();
  }

  public click_on_show_link_roots() : void
  {
    this.__state.from_aside.base.report_click_on_show_link_roots();
  }
}
