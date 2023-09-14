import { Component } from '@angular/core';
import { Ptr } from '../../../../../core/common/Ptr';
import { Svg_Current_Event, Svg_Current_Event_Navigation } from '../../../services/data/svg/memory/Svg_Memory';
import { DataService } from '../../../services/data/data.service';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent 
{
  public readonly current_event : Ptr<Svg_Current_Event_Navigation>;

  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.current_event = data.svg.__.current_event.current_event_navigation_ptr;
  }

  public report_click_on_arrow_left() : void
  {
    this.__state.from_navigation.navigator.report_mouse_down_on_arrow_left();
  }

  public report_click_on_arrow_rigth() : void
  {
    this.__state.from_navigation.navigator.report_mouse_down_on_arrow_rigth();
  }

  public report_click_on_arrow_up() : void
  {
    this.__state.from_navigation.navigator.report_mouse_down_on_arrow_up();
  }

  public report_click_on_arrow_down() : void
  {
    this.__state.from_navigation.navigator.report_mouse_down_on_arrow_down();
  }

  public report_mouse_up() : void
  {
    this.__state.from_navigation.navigator.report_mouse_up();
  }
}
