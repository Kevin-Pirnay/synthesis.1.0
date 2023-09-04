import { IDto } from './../../../../core/port/driver/dto/IDto';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { Container } from './../../../../core/domain/entities/Container';
import { Injectable } from '@angular/core';
import { Ptr } from '../../../../core/common/Ptr';
import { Data_Type } from '../../../../core/domain/handlers/handlers_entities/Data_Type';
import { __assign } from 'tslib';
import { Svg } from './svg/Svg';
import { Aside } from './aside/Aside';

@Injectable({
  providedIn: 'root'
})


export class DataService
{
  public readonly svg : Svg;
  public readonly aside : Aside;
}


export class DataService_0_1 
{
  private readonly __dtos : IDto[] = [];
  private readonly __stack_view_ids : string[] = [];
  private readonly __roots_choices : IDto[] = [];

  private readonly __event : Event_State;
  private readonly __focus : Focus_State;
  private readonly __aside : Aside_State;

  private readonly __set : Set_State;
  private readonly __ask : Ask_State;
  private readonly __get : Get_Data_State;
  private readonly __data : Data_Handler;

  constructor()
  {
    this.__event = new Event_State();
    this.__focus = new Focus_State();
    this.__aside = new Aside_State();

    this.__set = new Set_State(this.__event, this.__focus, this.__aside);
    this.__ask = new Ask_State(this.__event, this.__focus);
    this.__get = new Get_Data_State(this.__focus, this.__dtos, this.__aside, this.__stack_view_ids, this.__roots_choices);
    this.__data = new Data_Handler(this.__dtos, this.__stack_view_ids, this.__roots_choices);
  }
  
   
  public get_container_on_focus_ptr = () : Ptr<Container> => { return this.__get.get_container_on_focus_ptr(); }

  public get_ligature_on_focus_ptr = () : Ptr<Ligature> => { return this.__get.get_ligature_on_focus_ptr(); }

 
  public get_is_showing_menu_ptr = () : Ptr<boolean> => { return this.__get.get_is_showing_menu_ptr(); }
  
  public get_is_showing_back_view_ptr = () : Ptr<boolean> => { return this.__get.get_is_showing_back_view_ptr(); }
  
  public get_is_showing_choose_root_ptr = () : Ptr<boolean> => { return this.__get.get_is_showing_choose_root_ptr(); }

  public get_is_showing_paginate_ptr = (): Ptr<boolean> => { return this.__get.get_is_showing_paginate_ptr(); }

  public get_is_showing_link_roots_ptr = (): Ptr<boolean> => { return this.__get.get_is_showing_link_roots_ptr(); }
  
}

class Event_State
{
  public is_mouse_down_on_container : boolean = false;
  public is_mouse_down_on_grip : boolean = false;
  public is_mouse_down_on_ligature : boolean = false;
  public is_mouse_down_on_root_choice : boolean = false;
  public is_zooming : boolean = false;
  public is_view_moving : boolean = false;
  public is_linking_roots : boolean = false;
}

class Aside_State
{
  public is_showing_menu : Ptr<boolean> = new Ptr();
  public is_showing_back_view : Ptr<boolean> = new Ptr();
  public is_showing_choose_root : Ptr<boolean> = new Ptr();
  public is_showing_paginate : Ptr<boolean> = new Ptr();
  public is_showing_link_roots : Ptr<boolean> = new Ptr();
}

class Focus_State
{
  public container_currently_on_focus : Ptr<Container> = new Ptr();
  public ligature_currently_on_focus : Ptr<Ligature> = new Ptr();
}

class Set_State
{
  constructor(private readonly __event : Event_State, private readonly __focus : Focus_State, private readonly __aside : Aside_State) { }
  
  private __reset_elements_on_focus()  : void
  {
    this.__focus.container_currently_on_focus._ = null;
    this.__focus.ligature_currently_on_focus._ = null;
  }

  public set_mouse_is_down_on_a_container(container : Container) : void
  {
    this.__reset_elements_on_focus();
    this.__event.is_mouse_down_on_container = true;
    this.__focus.container_currently_on_focus._ = container;
  }

  public set_mouse_is_down_on_a_root_choice() : void
  {
    this.__reset_elements_on_focus();
    this.__event.is_mouse_down_on_root_choice = true;
  }

  public set_mouse_is_up() : void
  {
    this.__event.is_mouse_down_on_container = false;
    this.__event.is_mouse_down_on_grip = false;
    this.__event.is_mouse_down_on_ligature = false;
    this.__event.is_mouse_down_on_root_choice = false;
    this.__event.is_zooming = false;//???
    this.__event.is_view_moving = false;//???
  }

  public set_mouse_is_down_on_a_ligature(ligature : Ligature) : void
  {
    this.__reset_elements_on_focus();
    this.__event.is_mouse_down_on_ligature = true;
    this.__focus.ligature_currently_on_focus._ = ligature;
  }

  public set_mouse_is_down_on_a_grip(ligature : Ligature) : void
  {
    this.__reset_elements_on_focus();
    this.__event.is_mouse_down_on_grip = true;
    this.__focus.ligature_currently_on_focus._ = ligature;
  }

  public set_container_on_focus_from_dtos(dtos : IDto[]) : void
  {
    const last_index = dtos.length - 1;

    if ( dtos[last_index].type == Data_Type.CONTAINER ) this.set_container_on_focus(dtos[last_index].element);

    else this.set_container_on_focus(dtos[last_index - 1].element);
  }

  public set_container_on_focus(container : Container | null) : void
  {
    this.__focus.container_currently_on_focus._ = container;
  }

  public set_ligature_on_focus(ligature : Ligature | null) : void
  {
    this.__focus.ligature_currently_on_focus._ = ligature;
  }

  public set_is_zooming(value : boolean) : void
  {
    this.__event.is_zooming = value;
  }

  public set_is_view_moving(value : boolean) : void
  {
    this.__event.is_view_moving = value;
  }

  public set_is_linking_roots(value : boolean) : void
  {
    this.__event.is_linking_roots = value;
  }

  private __reset_show_tags_aside() : void
  {
    this.__aside.is_showing_menu._ = false;
    this.__aside.is_showing_back_view._ = false;
    this.__aside.is_showing_choose_root._ = false;
    this.__aside.is_showing_paginate._ = false;
    this.__aside.is_showing_link_roots._ = false;
  }

  public set_show_back_view(value : boolean) : void
  {
    this.__reset_show_tags_aside();
    this.__aside.is_showing_back_view._ = value;
  }
  public set_show_menu(value : boolean) : void
  {
    this.__reset_show_tags_aside();
    this.__aside.is_showing_menu._ = value;
  }

  public set_show_choose_root(value: boolean) : void
  {
    this.__reset_show_tags_aside();
    this.__aside.is_showing_choose_root._ = value;
  }

  public set_show_paginate(value: boolean) : void
  {
    this.__reset_show_tags_aside();
    this.__aside.is_showing_paginate._ = value;
  }

  public set_show_link_roots(value: boolean) : void
  {
    this.__reset_show_tags_aside();
    this.__aside.is_showing_link_roots._ = value;
  }
}

class Ask_State
{
  constructor(private readonly __event : Event_State, private readonly __focus : Focus_State) { }

  public is_mouse_down_on_something() : boolean
  {
    return this.__event.is_mouse_down_on_container 
        || this.__event.is_mouse_down_on_ligature 
        || this.__event.is_mouse_down_on_grip 
        || this.__event.is_mouse_down_on_root_choice
        || this.__event.is_linking_roots
        ? true : false;
  }

  public is_mouse_down_on_container() : boolean
  {
    return this.__event.is_mouse_down_on_container && this.__focus.container_currently_on_focus._ ? true : false;
  }

  public is_mouse_down_on_grip() : boolean
  {
    return this.__event.is_mouse_down_on_grip && this.__focus.ligature_currently_on_focus._ ? true : false;
  }

  public is_there_a_container_on_focus() : boolean
  {
    return this.__focus.container_currently_on_focus._ ? true : false;
  }

  public is_zooming() : boolean
  {
    return this.__event.is_zooming;
  }

  public is_view_moving() : boolean
  {
    return this.__event.is_view_moving;
  }

  public is_linking_roots() : boolean
  {
    return this.__event.is_linking_roots;
  }
}

class Get_Data_State
{
  constructor(
    private readonly __focus : Focus_State, 
    private readonly __dtos : IDto[], 
    private readonly __aside : Aside_State, 
    private readonly __stack_view_ids : string[],
    private readonly __roots_choices : IDto[]
  ) { }

  public container_on_focus() : Container
  {
    if ( this.__focus.container_currently_on_focus._ == null ) throw new Error("No Container is currently on focus");

    return this.__focus.container_currently_on_focus._;
  }

  public get_nullable_container_on_focus() : Container | null
  {
    return this.__focus.container_currently_on_focus._; 
  }

  public ligature_on_focus() : Ligature
  {
    if ( this.__focus.ligature_currently_on_focus._ == null ) throw new Error("No Ligature is currently on focus");

    return this.__focus.ligature_currently_on_focus._;
  }

  public get_nullable_ligature_on_focus() : Ligature | null
  {
    return this.__focus.ligature_currently_on_focus._; 
  }

  public get_container_on_focus_ptr() : Ptr<Container>
  {
    return this.__focus.container_currently_on_focus;
  }

  public get_ligature_on_focus_ptr() : Ptr<Ligature>
  {
    return this.__focus.ligature_currently_on_focus
  }

  public get_dtos_ptr() : IDto[]
  {
    return this.__dtos;
  }

  public get_is_showing_menu_ptr() : Ptr<boolean>
  {
    return this.__aside.is_showing_menu;
  }

  public get_is_showing_back_view_ptr() : Ptr<boolean>
  {
    return this.__aside.is_showing_back_view;
  }

  public get_is_showing_choose_root_ptr() : Ptr<boolean>
  {
    return this.__aside.is_showing_choose_root;
  }

  public get_is_showing_paginate_ptr(): Ptr<boolean> 
  {
    return this.__aside.is_showing_paginate;
  }

  public get_is_showing_link_roots_ptr(): Ptr<boolean> 
  {
    return this.__aside.is_showing_link_roots;
  }

  public get_stack_view_ids_ptr() : string[]
  {
    return this.__stack_view_ids;
  }

  public get_roots_choices_ptr() : IDto[]
  {
    return this.__roots_choices;
  }
}

class Data_Handler
{
  constructor(
    private readonly __dtos : IDto[], 
    private readonly __stack_view_ids : string[],
    private readonly __roots_choices : IDto[]
  ) { }

  public add_dtos(dtos : IDto[]) : void
  {
    dtos.forEach(dto => this.__dtos.push(dto));
  }

  public replace_its_current_dtos_by(dtos : IDto[]) : void
  {
    this.__dtos.length = 0; 
        
    dtos.forEach(dto => this.__dtos.push(dto));
  }

  public replace_its_current_dtos_by_a_dto(dto : IDto) : void
  {
    this.__dtos.length = 0; 
        
    this.__dtos.push(dto);
  }

  public delete_from_its_dtos(ids_to_delete: string[]) 
  {
    const new_list = this.__dtos.filter(dto => !ids_to_delete.includes(dto.element.id));

    this.__dtos.length = 0;

    new_list.forEach(dto => this.__dtos.push(dto));
  }

  public add_id_to_the_stack_view_ids(id : string) : void
  {
    this.__stack_view_ids.push(id);
  }

  public add_roots_to_roots_choices(roots : IDto[]) : void
  {
    roots.forEach(root => this.__roots_choices.push(root));
  }

  public replace_roots_choices_by(roots: IDto[]) 
  {
    this.__roots_choices.length = 0;

    roots.forEach(root => this.__roots_choices.push(root));
  }

  public remove_all_roots_choices() : void
  {
    this.__roots_choices.length = 0;
  }
}



