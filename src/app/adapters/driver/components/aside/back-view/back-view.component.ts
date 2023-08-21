import { Component } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-back-view',
  templateUrl: './back-view.component.html',
  styleUrls: ['./back-view.component.css']
})
export class BackViewComponent 
{
  public readonly stack_ids : string[];

  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.stack_ids = data.get_stack_view_ids_ptr();
  }

  public click_on_back_view(id : string) : void
  {
    this.__state.report_click_on_back_view(id);
  }

  public click_back_view_root() : void
  {
    this.__state.report_click_back_view_root();
  }
}
