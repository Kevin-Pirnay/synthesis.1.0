import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { DataService } from '../data/data.service';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { IDto } from '../../../../core/port/driver/dto/IDto';

@Injectable({
  providedIn: 'root'
})
export class PipelineService 
{
  constructor(private readonly __request : RequestService, private readonly __data : DataService) { }

  public request_create_container(e : MouseEvent, parent_container : Container | null) : void
  {
    const dtos : IDto[] = this.__request.request_create_container(e, parent_container);

    this.__data.add_dtos(dtos);

    this.__data.set_container_on_focus_from_dtos(dtos);
  }

  public request_delete_container(container : Container) : void
  {
    const ids_to_delete : string[] = this.__request.request_delete_container(container);

    this.__data.delete_from_its_dtos(ids_to_delete);

    this.__data.set_container_on_focus(null);
  }

  public request_move_container(e : MouseEvent, container : Container) : void
  {    
    this.__request.request_move_container(e, container);
  }

  public request_move_ligature(e : MouseEvent, ligature : Ligature) : void
  {    
    this.__request.request_move_ligature(e,ligature);
  }

  public request_assign_ligature(ligature : Ligature, container : Container | null) : void
  {
    this.__request.request_assign_ligature(ligature, container);
  }

  public request_move_view(key : string): void
  { 
   this.__request.request_move_view(key);
  }

  public request_zoom(direction : number) : void
  {    
    this.__request.request_zoom(direction);
  }

  public request_stop_zoomimg() : void
  {  
    this.__request.request_stop_zoomimg();  
  }

  public request_stop_moving_view() : void
  {
    this.__request.request_stop_moving_view();
  }
}
