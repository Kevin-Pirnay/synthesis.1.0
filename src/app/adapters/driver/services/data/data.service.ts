import { Ligature } from '../../../../core/domain/entities/Ligature';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Container } from './../../../../core/domain/entities/Container';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  private __is_mouse_down_on_container : boolean = false;
  private __is_mouse_down_on_grip : boolean = false;
  private __is_mouse_down_on_ligature : boolean = false;
  private __container_currently_on_focus : Container | null = null;
  private __ligature_currently_on_focus : Ligature | null = null;

  public readonly dtos : IDto[] = [];

  public set_mouse_is_down_on_a_container(container : Container) : void
  {
    this.__is_mouse_down_on_container = true;
    this.__container_currently_on_focus = container;
  }

  public set_mouse_is_up() : void
  {
    this.__is_mouse_down_on_container = false;
    this.__is_mouse_down_on_grip = false;
    this.__is_mouse_down_on_ligature = false;
  }

  public set_mouse_is_down_on_a_ligature(ligature : Ligature) : void
  {
    this.__is_mouse_down_on_ligature = true;
    this.__ligature_currently_on_focus = ligature;
  }

  public set_mouse_is_down_on_a_grip() : void
  {

  }

  public is_mouse_down_on_something() : boolean
  {
    return this.__is_mouse_down_on_container 
        || this.__is_mouse_down_on_ligature 
        || this.__is_mouse_down_on_grip 
        ? true : false;
  }

  public is_mouse_down_on_container()
  {
    return this.__is_mouse_down_on_container && this.__container_currently_on_focus ? true : false;
  }

  public container_on_focus() : Container
  {
    if ( this.__container_currently_on_focus == null ) throw new Error("No Container are currently on focus");

    return this.__container_currently_on_focus;
  }

  public add_dtos(dtos : IDto[]) : void
  {
    dtos.forEach(dto => this.dtos.push(dto));
  }

  public delete_from_its_dtos(ids_to_delete: string[]) 
  {
    const new_list = this.dtos.filter(dto => !ids_to_delete.includes(dto.element.id));

    this.dtos.length = 0;

    new_list.forEach(dto => this.dtos.push(dto));
  }

  public is_there_a_container_on_focus() : boolean
  {
    return this.__container_currently_on_focus ? true : false;
  }
}
