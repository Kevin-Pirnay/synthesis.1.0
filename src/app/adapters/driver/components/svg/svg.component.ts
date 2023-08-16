import { Component } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { DataService } from '../../services/data/data.service';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent 
{
  public readonly dtos : IDto[];

  constructor(private readonly __data : DataService, private readonly __state : StateService)
  {
    this.dtos = this.__data.dtos;
  }
}
