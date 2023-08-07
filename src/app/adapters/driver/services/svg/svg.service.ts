import { Injectable } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Pipeline } from '../../../../core/port/driver/Pipeline';
import { Create_Container_Request } from '../../../../core/port/driver/request/Create_Container_Request';
import { Vector_ } from '../../../../core/common/Vector/Vector_';

@Injectable({
  providedIn: 'root'
})
export class SvgService 
{
  public readonly dtos : IDto[] = [];
  
  constructor() { }

  public request_create_container = (e : MouseEvent) : void =>
  {
    const response = Pipeline.facade.create_container(new Create_Container_Request(Vector_.new([e.clientX, e.clientY])));
    console.log(response);
    
    response.dtos.forEach(dto => this.dtos.push(dto));
  }
}
