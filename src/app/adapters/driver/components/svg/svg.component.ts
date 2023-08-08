import { Component } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { SvgService } from '../../services/svg/svg.service';
import { Container } from '../../../../core/domain/entities/Container';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];
  private __is_down : boolean = false;
  private __current_container : Container | null = null;

  constructor(private readonly __svg_service : SvgService)
  {
    this.dtos = this.__svg_service.dtos;
  }

  public mouse_move(e : MouseEvent) : void
  {
    if(!this.__current_container || !this.__is_down) return;

    this.__svg_service.request_move_container(e, this.__current_container);
  }

  public mouse_down_on_container(container : Container) : void
  {
    this.__is_down = true;

    this.__current_container = container;
  }

  public mouse_up(e : MouseEvent) : void
  {
    if(!this.__is_down) this.__svg_service.request_create_container(e, this.__current_container);

    this.__is_down = false;
  }
}
