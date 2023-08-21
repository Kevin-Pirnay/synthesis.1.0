import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-choose-root',
  templateUrl: './choose-root.component.html',
  styleUrls: ['./choose-root.component.css']
})
export class ChooseRootComponent 
{
  constructor(private readonly __state : StateService) { }

  public click_on_next_choose_roots() : void
  {
    this.__state.report_click_on_next_choose_roots();
  }

  public click_on_previous_choose_root() : void
  {
    this.__state.report_click_on_previous_choose_root()
  }

  public click_on_back_choose_roots() : void
  {
    this.__state.report_click_on_back_choose_roots();
  }
}
