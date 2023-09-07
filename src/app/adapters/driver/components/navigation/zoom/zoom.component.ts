import { DataService } from './../../../services/data/data.service';
import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';
import { Ptr } from '../../../../../core/common/Ptr';


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})

export class ZoomComponent 
{ 
  public readonly cursor_position : Ptr<number>;

  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.cursor_position = data.navigation.__.zoom.cursor_position_ptr;
  }

  public ngAfterViewInit(): void 
  {
   
  }

  public mouse_down_on_cursor() : void
  {
    this.__state.from_navigation.zoom.report_mouse_is_down_on_cursor();
  }

  public mouse_up() : void
  {
    this.__state.from_navigation.zoom.report_mouse_is_up();
  }

  public mouse_move(e : MouseEvent) : void
  {
    this.__state.from_navigation.zoom.report_mouse_move(e.clientX);
  }
}