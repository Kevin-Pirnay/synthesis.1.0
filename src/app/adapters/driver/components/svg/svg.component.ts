import { Component } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { SvgService } from '../../services/svg/svg.service';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];
  public readonly roots_dto : IDto[];

  private __is_down_on_container : boolean = false;
  private __is_down_on_grip : boolean = false;
  private __is_down_on_root_dto : boolean = false;
  private __current_container : Container | null = null;
  private __current_ligature : Ligature | null = null;

  constructor(private readonly __svg_service : SvgService)
  {
    this.dtos = this.__svg_service.dtos;
    this.roots_dto = __svg_service.roots_dto;
  }

  public mouse_over_container(container : Container) : void
  {
    this.__current_container = container;
  }

  public mouse_move(e : MouseEvent) : void
  {
    if ( this.__current_ligature && this.__is_down_on_grip ) this.__svg_service.request_move_ligature(e, this.__current_ligature);

    if ( this.__current_container && this.__is_down_on_container ) this.__svg_service.request_move_container(e, this.__current_container);
  }

  public mouse_down_on_container(container : Container) : void
  {
    this.__is_down_on_container = true;

    this.__current_container = container;
  }

  public mouse_up(e : MouseEvent) : void
  {    
    if ( !this.__is_down_on_container && !this.__is_down_on_grip && !this.__is_down_on_root_dto ) this.__svg_service.request_create_container(e, this.__current_container);

    if ( this.__is_down_on_grip && this.__current_ligature ) this.__svg_service.request_assign_ligature(this.__current_ligature, this.__current_container);

    this.__is_down_on_container = false;

    this.__is_down_on_grip = false;

    this.__is_down_on_root_dto = false;
  }

  public key_press(e: KeyboardEvent) : void
  {    
    switch (e.key) 
    {
      case '+':
        this.__svg_service.request_zoom(1);
        break;
      case '-':
          this.__svg_service.request_zoom(-1);
          break;

      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        this.__svg_service.request_move_view(e.key);
      break;

      case '?':
        this.__svg_service.request_vew_paginate(1);
      break
      case '.':
        this.__svg_service.request_vew_paginate(-1);
      break;

      case '£':
        this.__svg_service.request_back_view();
      break;

      case '%':
        this.__svg_service.request_view_choose_root(1);
      break
      case '*':
        this.__svg_service.request_view_choose_root(-1);
      break;

      case 'v':
        if(this.__current_container) this.__svg_service.request_init_choose_root(this.__current_container);
      break;
    
      default:
        break;
    }
  }
  
  public dbclick_on_container(container : Container) : void
  {
    //this.__svg_service.request_delete_container(container);
    //this.__svg_service.request_view_as_root(container);
    //this.__svg_service.request_paginate(container);
    this.__svg_service.request_mark_as_root(container);
    //this.__svg_service.request_init_choose_root(container);
    //this.__svg_service.request_link_project("");
  }

  public mouse_down_on_grip(ligature : Ligature) : void
  {
    this.__is_down_on_grip = true;

    this.__current_ligature = ligature;
  }

  public mousedown_on_root_dto(dto : IDto) : void
  {
    this.__is_down_on_root_dto  = true;
    this.__svg_service.request_choose_root(dto._);
  }
}
