import { Component } from '@angular/core';
import { Ptr } from '../../../../../core/common/Ptr';
import { Container } from '../../../../../core/domain/entities/Container';
import { DataService } from '../../../services/data/data.service';
import { PipelineService } from '../../../services/pipeline/pipeline.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent 
{ 
    private readonly __container_on_focus : Ptr<Container>;

    constructor(data : DataService, private readonly __pipeline : PipelineService)
    {
      this.__container_on_focus = data.get_container_on_focus_ptr();
    } 

    public delete_container() : void
    {
      if ( this.__container_on_focus._ ) this.__pipeline.request_delete_container(this.__container_on_focus._);
    }

    public view_as_root() : void
    {
      if ( this.__container_on_focus._ ) this.__pipeline.request_view_as_root(this.__container_on_focus._);
    }

    public mark_as_root() : void
    {
      if ( this.__container_on_focus._ ) this.__pipeline.request_mark_as_root(this.__container_on_focus._);
    }
}
