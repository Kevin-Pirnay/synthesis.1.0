import { Component } from '@angular/core';
import { Ptr } from '../../../../../../core/common/Ptr';
import { Aside_Current_View } from '../../../../services/data/aside/memory/Aside_Memory';
import { DataService } from '../../../../services/data/data.service';
import { StateService } from '../../../../services/state/state.service';

@Component({
  selector: 'app-under-menu',
  templateUrl: './under-menu.component.html',
  styleUrls: ['./under-menu.component.css']
})
export class UnderMenuComponent 
{
  public readonly current_view : Ptr<Aside_Current_View>;

  constructor(data : DataService) 
  { 
    this.current_view = data.aside.__.current_view.current_view_ptr;
  }
}
