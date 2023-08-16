import { Component } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { SvgService } from '../../services/svg/svg.service';


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];

  private __is_down_on_container : boolean = false;
  private __focus_container : Container | null = null;
  private __focus_ligature : Ligature | null = null;
  private __is_down_on_grip : boolean = false;
  private __is_zooming : boolean = false;
  private __is_moving_view : boolean = false;

  constructor(private readonly __svg_service : SvgService)
  {
    this.dtos = this.__svg_service.dtos;
  }

  public mouse_over_container(container : Container) : void
  {
    this.__focus_container = container;
  }

  public mouse_move(e : MouseEvent) : void
  {
    if ( this.__focus_ligature && this.__is_down_on_grip ) this.__svg_service.request_move_ligature(e, this.__focus_ligature);

    if ( this.__focus_container && this.__is_down_on_container ) this.__svg_service.request_move_container(e, this.__focus_container);
  }

  public mouse_down_on_container(container : Container) : void
  {
    this.__is_down_on_container = true;

    this.__focus_container = container;
  }

  public mouse_up(e : MouseEvent) : void
  {    
    if ( !this.__is_down_on_container && !this.__is_down_on_grip ) this.__svg_service.request_create_container(e, this.__focus_container);

    if ( this.__is_down_on_grip && this.__focus_ligature ) this.__svg_service.request_assign_ligature(this.__focus_ligature, this.__focus_container);

    this.__is_down_on_container = false;

    this.__is_down_on_grip = false;
  }

  public key_press(e: KeyboardEvent) : void
  {    
    switch (e.key) 
    {
      case '+':
        this.__is_zooming = true;
        this.__svg_service.request_zoom(1);
        break;
      case '-':
          this.__is_zooming = true;
          this.__svg_service.request_zoom(-1);
          break;

      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        this.__is_moving_view = true;
        this.__svg_service.request_move_view(e.key);
      break;

      default:
        break;
    }
  }

  public key_up() : void
  {
    if ( this.__is_zooming ) this.__svg_service.request_unzoom();
    if ( this.__is_moving_view ) this.__svg_service.request_stop_moving_view();
    this.__is_zooming = false;
    this.__is_moving_view = false;
  }
  
  public dbclick_on_container(container : Container) : void
  {
    this.__svg_service.request_delete_container(container);
  }
}

