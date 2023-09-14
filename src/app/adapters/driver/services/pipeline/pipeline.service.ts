import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { DataService } from '../data/data.service';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Root_Choice } from '../../../../core/domain/entities/Root_Choice';
import { Observer } from '../../../../core/common/Observer/Observer';
import { Svg__Dtos_ } from '../data/svg/dao/Svg__Dtos_';
import { Svg__Focus_ } from '../data/svg/dao/Svg__Focus_';
import { Svg_Current_Event_ } from '../data/svg/dao/Svg_Current_Event_';
import { Aside__Stack_Roots_Ids_ } from '../data/aside/dao/Aside__Stack_Roots_Ids_';
import { Attribute_Handler } from '../data/handler/Attribute';

@Injectable({
  providedIn: 'root'
})
export class PipelineService 
{
  private readonly __data_dtos : Svg__Dtos_;
  private readonly __data_current_event : Svg_Current_Event_;
  private readonly __data_focus : Svg__Focus_;
  private readonly __data_back_view : Aside__Stack_Roots_Ids_;
  private readonly __data_attribute : Attribute_Handler;

  constructor(private readonly __request : RequestService, data : DataService) 
  { 
    this.__data_dtos = data.svg.__.dtos;
    this.__data_focus = data.svg.__.focus;
    this.__data_back_view = data.aside.__.stack_roots_ids;
    this.__data_current_event = data.svg.__.current_event;
    this.__data_attribute = data.handler.attribute
  }

  public request_create_container(e : MouseEvent, parent_container : Container | null) : void
  {
    const dtos : IDto[] = this.__request.request_create_container(e, parent_container);

    this.__data_dtos.add_dtos(dtos);

    this.__data_focus.set_container_on_focus_from_dtos(dtos); 
    
    if (  !this.__data_focus.is_there_a_current_parent_container() ) this.__data_focus.set_this_container_as_current_parent_container(dtos[0].element);
  }

  public request_delete_container(container : Container) : void
  {
    const ids_to_delete : string[] = this.__request.request_delete_container(container);

    this.__data_dtos.delete_from_its_dtos(ids_to_delete);

    this.__data_focus.reset();
  }

  public request_move_container(e : MouseEvent, container : Container) : void
  {    
    this.__request.request_move_container(e, container);
  }

  public request_move_ligature(e : MouseEvent, ligature : Ligature) : void
  {    
    this.__request.request_move_ligature(e,ligature);
  }

  public request_assign_ligature(ligature : Ligature, container : Container | null) : void
  {
    this.__request.request_assign_ligature(ligature, container);
  }

  public request_move_view(direction : string): void
  { 
   this.__request.request_move_view(direction);
  }

  public request_zoom(direction : number) : void
  {    
    this.__request.request_zoom(direction);
  }

  public request_stop_zoomimg() : void
  {  
    this.__request.request_stop_zoomimg();  
  }

  public request_stop_moving_view() : void
  {
    this.__request.request_stop_moving_view();
  }

  public request_view_as_root(container : Container) : void
  {
      const dtos : IDto[] = this.__request.request_view_as_root(container);

      this.__data_dtos.replace_its_current_dtos_by(dtos);

      this.__data_back_view.add_id_to_the_stack_view_ids(container.id);
  }

  public request_back_view(container_id : string | null) : void
  {
    const dtos : IDto[] = this.__request.request_back_view(container_id);

    this.__data_dtos.replace_its_current_dtos_by(dtos);
  }

  public request_mark_as_root(container : Container) : void
  {
    const dto : IDto = this.__request.request_mark_as_root(container);

    this.__data_dtos.replace_its_current_dtos_by_a_dto(dto);
  }

  public async request_init_choose_root(container : Container) : Promise<void>
  {
    const dtos : IDto[] = await this.__request.request_init_choose_root(container);

    this.__data_dtos.replace_its_current_dtos_by_a_dto(dtos[1])

    this.__data_dtos.add_roots_to_root_choices(dtos[0]);    
  }

  public request_view_choose_root(direction : number) : void
  {
    const dtos : IDto[] = this.__request.request_view_choose_root(direction);

    this.__data_dtos.replace_roots_choices_by(dtos);
  }

  public async request_chosen_root(chosen_root : Root_Choice) : Promise<void>
  {
    const witness_anim = new Observer<number>().subscribe((count : number)=> this.__data_attribute.set_attribute_to_those_dtos("opacity", `${1 - count/100}`, [chosen_root.flow]));

    const dtos : IDto[] = await this.__request.request_chosen_root(chosen_root, witness_anim);

    this.__data_dtos.replace_its_current_dtos_by(dtos);

    this.__data_dtos.remove_all_roots_choices();

    this.__data_current_event.set_current_event_to_none();
  }

  public request_init_paginate(container : Container) : void
  {
    const dtos : IDto[] = this.__request.request_init_paginate(container);

    this.__data_dtos.replace_its_current_dtos_by(dtos);
  } 

  public request_view_paginate(direction : number) : void
  {
    const dtos : IDto[] = this.__request.request_view_paginate(direction);

    this.__data_dtos.replace_its_current_dtos_by(dtos);
  } 

  public request_init_link_roots(container : Container) : void
  {
    const observer : Observer<IDto[]> = this.__request.request_init_link_roots(container);

    observer.subscribe((dtos : IDto[]) => this.__data_dtos.replace_its_current_dtos_by(dtos));
  }

  public request_view_links_roots(direction : number) : void
  {
    const observer : Observer<IDto[]> = this.__request.request_view_links_roots(direction);

    observer.subscribe((dtos : IDto[]) => this.__data_dtos.replace_its_current_dtos_by(dtos));
  }

  public request_select_links_roots(container : Container) : void
  {
    const dtos : IDto[] = this.__request.request_select_links_roots(container);

    this.__data_dtos.replace_its_current_dtos_by(dtos);

    setTimeout(() => {
      
      this.__data_current_event.set_current_event_to_none();
    }, 1000);
  }

  public request_select_subtree(container : Container) : void
  {
    const containers : Container[] = this.__request.request_select_subtree(container);

    this.__data_focus.set_those_containers_as_selected(containers);
  }
}
