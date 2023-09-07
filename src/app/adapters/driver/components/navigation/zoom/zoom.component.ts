import { DataService } from './../../../services/data/data.service';
import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';
import { Svg_Current_Event } from '../../../services/data/svg/memory/Svg_Memory';


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})

export class ZoomComponent 
{ 
  constructor(data : DataService, private readonly __state : StateService) 
  { 
    data.svg.__.current_event.current_event_zooming_observer.subscribe((event  : Svg_Current_Event) =>
    {
      if (event == Svg_Current_Event.ZOOMING_DOWN) this.__report_moving_cursor_to_the_left();

      if (event == Svg_Current_Event.ZOOMING_UP) this.__report_moving_cursor_to_the_rigth();
    });
  }

  public ngAfterViewInit(): void 
  {
   
  }

  private __report_moving_cursor_to_the_left() : void
  {
    this.__state.from_navigation.zoom.report_moving_cursor_to_the_left();
  }

  private __report_moving_cursor_to_the_rigth() : void
  {
    this.__state.from_navigation.zoom.report_moving_cursor_to_the_rigth();
  }

  public mouse_down_on_cursor() : void
  {
    this.__state.from_navigation.zoom.report_mouse_is_down_on_cursor();
   
  }

  public mouse_up_on_cursor() : void
  {
    this.__state.from_navigation.zoom.report_mouse_is_up();
   
  }

  public mouse_move() : void
  {

  }
}
