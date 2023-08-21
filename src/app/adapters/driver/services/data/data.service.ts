import { Ligature } from '../../../../core/domain/entities/Ligature';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Container } from './../../../../core/domain/entities/Container';
import { Injectable } from '@angular/core';
import { Ptr } from '../../../../core/common/Ptr';
import { Data_Type } from '../../../../core/domain/handlers/handlers_entities/Data_Type';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  private __is_mouse_down_on_container : boolean = false;
  private __is_mouse_down_on_grip : boolean = false;
  private __is_mouse_down_on_ligature : boolean = false;
  private __is_zooming : boolean = false;
  private __is_view_moving : boolean = false;

  public container_currently_on_focus : Ptr<Container> = new Ptr();
  private ligature_currently_on_focus : Ptr<Ligature> = new Ptr();

  public readonly dtos : IDto[] = [];

  public set_mouse_is_down_on_a_container(container : Container) : void
  {
    this.__reset_elements_on_focus();
    this.__is_mouse_down_on_container = true;
    this.container_currently_on_focus._ = container;
  }

  public set_mouse_is_up() : void
  {
    this.__is_mouse_down_on_container = false;
    this.__is_mouse_down_on_grip = false;
    this.__is_mouse_down_on_ligature = false;
  }

  private __reset_elements_on_focus()  : void
  {
    this.container_currently_on_focus._ = null;
    this.ligature_currently_on_focus._ = null;
  }

  public set_mouse_is_down_on_a_ligature(ligature : Ligature) : void
  {
    this.__reset_elements_on_focus();
    this.__is_mouse_down_on_ligature = true;
    this.ligature_currently_on_focus._ = ligature;
  }

  public set_mouse_is_down_on_a_grip(ligature : Ligature) : void
  {
    this.__reset_elements_on_focus();
    this.__is_mouse_down_on_grip = true;
    this.ligature_currently_on_focus._ = ligature;
  }

  public is_mouse_down_on_something() : boolean
  {
    return this.__is_mouse_down_on_container 
        || this.__is_mouse_down_on_ligature 
        || this.__is_mouse_down_on_grip 
        ? true : false;
  }

  public is_mouse_down_on_container() : boolean
  {
    return this.__is_mouse_down_on_container && this.container_currently_on_focus._ ? true : false;
  }

  public is_mouse_down_on_grip() : boolean
  {
    return this.__is_mouse_down_on_grip && this.ligature_currently_on_focus._ ? true : false;
  }

  public container_on_focus() : Container
  {
    if ( this.container_currently_on_focus._ == null ) throw new Error("No Container is currently on focus");

    return this.container_currently_on_focus._;
  }

  public ligature_on_focus() : Ligature
  {
    if ( this.ligature_currently_on_focus._ == null ) throw new Error("No Ligature is currently on focus");

    return this.ligature_currently_on_focus._;
  }

  public add_dtos(dtos : IDto[]) : void
  {
    dtos.forEach(dto => this.dtos.push(dto));
  }

  public replace_its_current_dtos_by(dtos : IDto[]) : void
  {
    this.dtos.length = 0; 
        
    dtos.forEach(dto => this.dtos.push(dto));
  }

  public replace_its_current_dtos_by_a_dto(dto : IDto) : void
  {
    this.dtos.length = 0; 
        
    this.dtos.push(dto);
  }

  public delete_from_its_dtos(ids_to_delete: string[]) 
  {
    const new_list = this.dtos.filter(dto => !ids_to_delete.includes(dto.element.id));

    this.dtos.length = 0;

    new_list.forEach(dto => this.dtos.push(dto));
  }

  public is_there_a_container_on_focus() : boolean
  {
    return this.container_currently_on_focus._ ? true : false;
  }

  public set_container_on_focus_from_dtos(dtos : IDto[]) : void
  {
    const last_index = dtos.length - 1;

    if ( dtos[last_index].type == Data_Type.CONTAINER ) this.set_container_on_focus(dtos[last_index].element);

    else this.set_container_on_focus(dtos[last_index - 1].element);
  }

  public set_container_on_focus(container : Container | null) : void
  {
    this.container_currently_on_focus._ = container;
  }

  public set_ligature_on_focus(ligature : Ligature | null) : void
  {
    this.ligature_currently_on_focus._ = ligature;
  }

  public set_is_zooming(value : boolean) : void
  {
    this.__is_zooming = value;
  }

  public set_is_view_moving(value : boolean) : void
  {
    this.__is_view_moving = value;
  }

  public is_zooming() : boolean
  {
    return this.__is_zooming;
  }

  public is_view_moving() : boolean
  {
    return this.__is_view_moving;
  }
}


