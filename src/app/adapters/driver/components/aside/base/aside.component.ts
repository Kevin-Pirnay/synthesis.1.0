import { DataService } from './../../../services/data/data.service';
import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';
import { Ptr } from '../../../../../core/common/Ptr';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent 
{
  public readonly is_showing_menu_ptr : Ptr<boolean>;
  public readonly is_showing_back_view_ptr : Ptr<boolean>;

  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.is_showing_menu_ptr = data.get_is_showing_menu_ptr();
    this.is_showing_back_view_ptr =data.get_is_showing_back_view_ptr();
    data.set_show_menu(true);
  }

  public click_on_show_menu() : void
  {
    this.__state.report_click_on_show_menu();
  }

  public click_on_show_back_view() : void
  {
    this.__state.report_click_on_show_back_view();
  }
}
