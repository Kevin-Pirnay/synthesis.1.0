import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { PipelineService } from '../pipeline/pipeline.service';

//refactor to have a better understanding to where the function are called eg: menu or others asides components

@Injectable({
  providedIn: 'root'
})
export class StateService 
{
  constructor(
    private readonly __data : DataService, 
    private readonly __pipeline : PipelineService
  ) { }

  public report_key_down(e: KeyboardEvent) : void 
  {
    switch (e.key) 
    {
      case '+':
        this.__data.set_is_zooming(true)
        this.__pipeline.request_zoom(1);
      break;
      case '-':
        this.__data.set_is_zooming(true)
        this.__pipeline.request_zoom(-1);
      break;

      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        this.__data.set_is_view_moving(true);
        this.__pipeline.request_move_view(e.key);
      break;


      default:
        break;
    }
  }

  public report_mouse_up(e : MouseEvent) : void
  {
    if ( !this.__data.is_mouse_down_on_something() ) this.__data.is_there_a_container_on_focus() ? this.__pipeline.request_create_container(e, this.__data.container_on_focus()) : this.__pipeline.request_create_container(e, null);

    if ( this.__data.is_mouse_down_on_grip() ) this.__pipeline.request_assign_ligature(this.__data.ligature_on_focus(), this.__data.get_nullable_container_on_focus());

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

  public report_key_up() : void
  {
    if ( this.__data.is_zooming() ) this.__pipeline.request_stop_zoomimg();
    if ( this.__data.is_view_moving() ) this.__pipeline.request_stop_moving_view();
  }

  public report_click_on_show_menu() : void
  {
    this.__data.set_show_menu(true);
  }

  public report_click_on_show_back_view() : void
  {
    this.__data.set_show_back_view(true);
  }

  public report_click_on_mark_as_root() : void 
  {
    if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_mark_as_root(this.__data.container_on_focus());
  }

  public report_click_on_view_as_root() : void 
  {
    if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_view_as_root(this.__data.container_on_focus());
  }

  public report_click_on_delete_container() : void 
  {
    if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_delete_container(this.__data.container_on_focus());
  }

  public report_click_on_back_view(container_id: string) : void
  {
    this.__pipeline.request_back_view(container_id);
  }

  public report_click_back_view_root() : void 
  {
    this.__pipeline.request_back_view(null);
  }

  public report_click_on_show_choose_root() : void
  {
    this.__data.set_show_choose_root(true);
  }

  public report_click_on_choose_root() : void
  {
    if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_init_choose_root(this.__data.container_on_focus());
  }

  public report_click_on_back_choose_roots() : void
  {
    this.__pipeline.request_back_view(null);
  }

  public report_click_on_previous_choose_root() : void
  {
    this.__pipeline.request_view_choose_root(-1);
  }

  public report_click_on_next_choose_roots() : void
  {
    this.__pipeline.request_view_choose_root(1)
  }

  public report_click_on_paginate() : void // menu
  {
    if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_init_paginate(this.__data.container_on_focus());
  }

  public report_clik_on_previous_paginate() : void
  {
    this.__pipeline.request_view_paginate(-1);
  }

  public report_clik_on_next_paginate() : void
  {
    this.__pipeline.request_view_paginate(1);
  }

  public report_click_on_show_paginate() : void
  {
    this.__data.set_show_paginate(true);
  }

  public report_clik_on_back() : void //change that and in general be more precise
  {
    this.__pipeline.request_back_view(null);
  }

  public report_click_on_next_link_roots() : void
  {
    this.__pipeline.request_view_links_roots(1);
  }

  public report_click_on_previous_link_root() : void
  {
    this.__pipeline.request_view_links_roots(-1);
  }

  public report_click_on_back_link_roots() : void
  {
    this.__pipeline.request_back_view(null);
  }

  public report_click_on_show_link_roots() : void
  {
    this.__data.set_show_link_roots(true);
  }

  report_click_on_link_roots() : void
  {
    this.__pipeline.request_init_link_roots();
  }
}
