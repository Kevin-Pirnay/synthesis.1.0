import { Vector_ } from '../../../../core/common/Vector/Vector_';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { Create_Container_Request, Delete_Container_Request, Move_Container_Request, Move_ligature_Request, Assign_Ligature_Request, Move_View_Request, Zoom_Request, Choose_Root_Request, Mark_As_Root_Request, View_As_Root_Request, Back_View_Request, View_Choose_Root_Request } from '../../../../core/port/driver/request/request';
import { Pipeline } from './../../../../core/port/driver/Pipeline';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService 
{
  public request_create_container(e : MouseEvent, parent_container : Container | null = null) : IDto[]
  {
    const request = new Create_Container_Request(Vector_.new([e.clientX, e.clientY,0]), parent_container);

    const response = Pipeline.facade.execute_create_container(request);
    
    return response.dtos;   
  }

  public request_delete_container(container : Container) : string[]
  {
    const request = new Delete_Container_Request(container);

    const response = Pipeline.facade.execute_delete_container(request);

    return response.ids_to_remove;
  }

  public request_move_container(e : MouseEvent, container : Container) : void
  {    
    const request = new Move_Container_Request(Vector_.new([e.clientX, e.clientY,0]), container);

    Pipeline.facade.execute_move_container(request);
  }

  public request_move_ligature(e : MouseEvent, ligature : Ligature) : void
  {    
    const request = new Move_ligature_Request(Vector_.new([e.clientX, e.clientY,0]), ligature);

    Pipeline.facade.execute_move_ligature(request);
  }

  public request_assign_ligature(ligature : Ligature, container : Container | null) : void
  {
    const request = new Assign_Ligature_Request(ligature, container);

    Pipeline.facade.execute_assign_ligature(request);
  }

  public request_move_view(key : string): void
  { 
    const request = new Move_View_Request(key);

    Pipeline.facade.execute_move_view(request);
  }

  public request_stop_moving_view() : void
  {
    Pipeline.facade.execute_stop_move_view();
  }

  public request_zoom(direction : number) : void
  {    
    const request = new Zoom_Request(direction);

    Pipeline.facade.execute_zoom(request);
  }

  public request_stop_zoomimg() : void
  {    
    Pipeline.facade.execute_stop_zoom();
  }

  public request_view_as_root(container : Container) : IDto[]
  {
    const request = new View_As_Root_Request(container);

    const response = Pipeline.facade.execute_view_as_root(request);

    return response.dtos;
  }

  public request_back_view(container_id : string | null) : IDto[]
  {
    const request  = new Back_View_Request(container_id);

    const response = Pipeline.facade.execute_back_view(request);

    return response.dtos;
  }

  public request_mark_as_root(container : Container) : IDto
  {
    const request = new Mark_As_Root_Request(container);
    
    const response = Pipeline.facade.execute_mark_as_root(request);

    return response.dto;
  }

  public request_init_choose_root(container : Container) : IDto[]
  {    
    const request = new Choose_Root_Request(container);

    const response = Pipeline.facade.execute_init_choose_roots(request);
    
    return response.dtos
  }

  public request_view_choose_root(direction : number) : IDto[]
  {
    const request = new View_Choose_Root_Request(direction);

    const response = Pipeline.facade.execute_view_choose_roots(request);  

    return response.dtos;
  }
}
