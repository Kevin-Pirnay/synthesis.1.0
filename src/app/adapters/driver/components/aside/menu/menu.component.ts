import { Component } from '@angular/core';
import { Ptr } from '../../../../../core/common/Ptr';
import { Container } from '../../../../../core/domain/entities/Container';
import { DataService } from '../../../services/data/data.service';
import { PipelineService } from '../../../services/pipeline/pipeline.service';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent 
{ 
    private readonly __container_on_focus_ptr : Ptr<Container>;

    constructor(data : DataService, private readonly __state : StateService)
    {
      this.__container_on_focus_ptr = data.get_container_on_focus_ptr();
    } 

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
}
