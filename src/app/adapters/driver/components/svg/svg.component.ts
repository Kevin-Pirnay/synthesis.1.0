import { Component } from '@angular/core';
import { StateService } from './../../services/state/state.service';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { DataService } from '../../services/data/data.service';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { Container } from '../../../../core/domain/entities/Container';


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];
  public readonly window_width : number;
  public readonly window_height : number;


  constructor(data_service : DataService, private readonly __state : StateService) 
  { 
    this.dtos = data_service.dtos;

    this.window_width = window.innerWidth;

    this.window_height = window.innerHeight;    
  }

  public mouse_up(e : MouseEvent) : void
  {
    this.__state.report_mouse_up(e);
  }

  public mouse_move(e : MouseEvent) : void
  {
    this.__state.report_mouse_move(e);
  }

  public mouse_down_on_container(container : Container) : void
  {
    this.__state.report_mouse_down_on_container(container);
  }

  public mouse_down_on_ligature(ligature : Ligature) : void
  {
    this.__state.report_mouse_down_on_ligature(ligature);
  }

  public mouse_down_on_grip(ligature : Ligature) : void
  {
    this.__state.report_mouse_down_on_grip(ligature);
  }

  public mouse_over_container(container : Container) : void
  {
    this.__state.report_mouse_over_container(container);
  }
}

