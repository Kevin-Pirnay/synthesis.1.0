import { Injectable } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Pipeline } from '../../../../core/port/driver/Pipeline';
import { Create_Container_Request } from '../../../../core/port/driver/request/Create_Container_Request';
import { Vector_ } from '../../../../core/common/Vector/Vector_';
import { Move_Container_Request } from '../../../../core/port/driver/request/Move_Container_Request';
import { Container } from '../../../../core/domain/entities/Container/Container';

@Injectable({
  providedIn: 'root'
})
export class SvgService 
{
  public readonly dtos : IDto[] = [];
  
  constructor() { }

  public request_create_container = (e : MouseEvent, parent_container : Container | null = null) : void =>
  {
    const response = Pipeline.facade.create_container(new Create_Container_Request(Vector_.new([e.clientX, e.clientY]), parent_container));
    
    response.dtos.forEach(dto => this.dtos.push(dto));
  }

  public request_move_container = (e : MouseEvent, container : Container) : void =>
  {    
    const request = new Move_Container_Request(Vector_.new([e.clientX, e.clientY]), container);

    Pipeline.facade.move_container(request);
  }
}
