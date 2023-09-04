import { Component } from '@angular/core';
import { Ptr } from '../../../../../core/common/Ptr';
import { Container } from '../../../../../core/domain/entities/Container';
import { DataService } from '../../../services/data/data.service';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent 
{ 
    constructor(private readonly __state : StateService) { } 

    public click_on_delete_container() : void
    {
      this.__state.report_click_on_delete_container();
    }

    public click_on_view_as_root() : void
    {
      this.__state.report_click_on_view_as_root();
    }

    public click_on_mark_as_root() : void
    {
      this.__state.report_click_on_mark_as_root();
    }

    public click_on_choose_root() : void
    {
      this.__state.report_click_on_choose_root();
    }

    public click_on_paginate() : void
    {
      this.__state.report_click_on_paginate();
    }

    public click_on_link_roots() : void
    {
      this.__state.report_click_on_link_roots();
    }
}
