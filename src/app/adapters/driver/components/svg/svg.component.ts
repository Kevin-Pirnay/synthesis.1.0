import { Component } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { SvgService } from '../../services/svg/svg.service';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];

  constructor(private readonly __svg_service : SvgService)
  {
    this.dtos = this.__svg_service.dtos;
  }
  
  public click_svg = (e : MouseEvent) : void =>
  {
    this.__svg_service.request_create_container(e);
  }
}
