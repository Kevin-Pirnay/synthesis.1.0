import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-link-roots',
  templateUrl: './link-roots.component.html',
  styleUrls: ['./link-roots.component.css']
})
export class LinkRootsComponent 
{

  constructor(private readonly __state : StateService) { }

  public click_on_next_link_roots() : void
  {
    this.__state.report_click_on_next_link_roots();
  }

  public click_on_previous_link_root() : void
  {
    this.__state.report_click_on_previous_link_root();
  }

  public click_on_back_link_roots() : void
  {
    this.__state.report_click_on_back_link_roots();
  }
}
