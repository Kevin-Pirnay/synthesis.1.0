import { Injectable } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Pipeline } from '../../../../core/port/driver/Pipeline';
import { Create_Container_Request } from '../../../../core/port/driver/request/Create_Container_Request';
import { Vector_ } from '../../../../core/common/Vector/Vector_';
import { Move_Container_Request } from '../../../../core/port/driver/request/Move_Container_Request';
import { Container } from '../../../../core/domain/entities/Container';
import { Zoom_Request } from '../../../../core/port/driver/request/Zoom_Request';
import { Delete_Container_Request } from '../../../../core/port/driver/request/Delete_Container_Request';
import { Move_View_Request } from '../../../../core/port/driver/request/Move_View_Request';
import { View_As_Root_Request } from '../../../../core/port/driver/request/View_As_Root_Request';
import { Paginate_Request } from '../../../../core/port/driver/request/Paginate_request';
import { View_Paginate_Request } from '../../../../core/port/driver/request/View_Paginate_Request';

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

  public request_delete_container(container : Container) : void
  {
    const request = new Delete_Container_Request(container);

    const response = Pipeline.facade.execute_delete_container(request);

    const new_list = this.dtos.filter(dto => !response.ids_to_remove.includes(dto._.id));

    this.dtos.length = 0;

    new_list.forEach(dto => this.dtos.push(dto));
  }

  public request_move_view(key : string): void
  { 
    const request = new Move_View_Request(key);

    Pipeline.facade.execute_move_view(request);
  }

  public request_view_as_root(container : Container) : void
  {
    const request = new View_As_Root_Request(container);

    const response = Pipeline.facade.execute_view_as_root(request);

    this.dtos.length = 0;

    response.dtos.forEach(dto => this.dtos.push(dto));
  }

  public request_paginate(container : Container) : void
  {
    const request = new Paginate_Request(container);

    const response = Pipeline.facade.execute_paginate(request);

    this.dtos.length = 0;
    
    response.dtos.forEach(dto => this.dtos.push(dto));
  } 

  //send ptr is_animating in response??? to prevent recall function while animating???
  public request_vew_paginate(direction : number)
  {
    const request = new View_Paginate_Request(direction);

    const response = Pipeline.facade.execute_view_paginate(request);

    this.dtos.length = 0; 
    
    console.log(response.dtos);
    
    
    response.dtos.forEach(dto => this.dtos.push(dto));
  }
}
