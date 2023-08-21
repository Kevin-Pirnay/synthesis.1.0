import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { PipelineService } from '../pipeline/pipeline.service';

@Injectable({
  providedIn: 'root'
})
export class StateService 
{
  constructor(
    private readonly __data : DataService, 
    private readonly __pipeline : PipelineService
  ) { }

  public report_mouse_up(e : MouseEvent) : void
  {
    if ( !this.__data.is_mouse_down_on_something() ) this.__data.is_there_a_container_on_focus() ? this.__pipeline.request_create_container(e, this.__data.container_on_focus()) : this.__pipeline.request_create_container(e, null);

    if ( this.__data.is_mouse_down_on_grip() ) this.__pipeline.request_assign_ligature(this.__data.ligature_on_focus(), this.__data.container_currently_on_focus._);

    this.__data.set_mouse_is_up();
  }

  public report_mouse_move(e : MouseEvent) : void
  {
      if ( this.__data.is_mouse_down_on_container() ) this.__pipeline.request_move_container(e, this.__data.container_on_focus());

      if ( this.__data.is_mouse_down_on_grip() ) this.__pipeline.request_move_ligature(e, this.__data.ligature_on_focus());
  }

  public report_mouse_down_on_container(container : Container) : void
  {
    this.__data.set_mouse_is_down_on_a_container(container);
  }

  public report_mouse_down_on_ligature(ligature : Ligature) : void
  {
    this.__data.set_mouse_is_down_on_a_ligature(ligature);
  }

  public report_mouse_down_on_grip(ligature : Ligature) : void
  {
    this.__data.set_mouse_is_down_on_a_grip(ligature);
  }

  public report_mouse_over_container(container : Container) : void
  {
    if ( this.__data.is_mouse_down_on_grip() ) this.__data.set_container_on_focus(container);
  }
}
