import { Component } from '@angular/core';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent 
{
  constructor(private readonly __state : StateService) { }

  public clik_on_next_paginate() : void
  {
    this.__state.report_clik_on_next_paginate();
  }

  public clik_on_previous_paginate() : void
  {
    this.__state.report_clik_on_previous_paginate();
  }
}
