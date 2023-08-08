import { Injectable } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Pipeline } from '../../../../core/port/driver/Pipeline';
import { Create_Container_Request } from '../../../../core/port/driver/request/Create_Container_Request';
import { Vector_ } from '../../../../core/common/Vector/Vector_';
import { Move_Container_Request } from '../../../../core/port/driver/request/Move_Container_Request';
import { Container } from '../../../../core/domain/entities/Container';
import { Zoom_Request } from '../../../../core/port/driver/request/Zoom_Request';

@Injectable({
  providedIn: 'root'
})
export class SvgService 
{
  public readonly dtos : IDto[] = [];
  
  constructor() { }

  public request_create_container(e : MouseEvent, parent_container : Container | null = null) : void
  {
    const request = new Create_Container_Request(Vector_.new([e.clientX, e.clientY]), parent_container);

    const response = Pipeline.facade.execute_create_container(request);
    
    response.dtos.forEach(dto => this.dtos.push(dto));
  }

  public request_move_container(e : MouseEvent, container : Container) : void
  {    
    const request = new Move_Container_Request(Vector_.new([e.clientX, e.clientY]), container);

    Pipeline.facade.execute_move_container(request);
  }

  public request_zoom(direction : number) : void
  {    
    const request = new Zoom_Request(direction);

    Pipeline.facade.execute_zoom(request);
  }
}
