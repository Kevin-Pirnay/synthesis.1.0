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
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { Move_ligature_Request } from '../../../../core/port/driver/request/Move_ligature_Request';
import { Assign_Ligature_Request } from '../../../../core/port/driver/request/Assign_Ligature_Request';
import { Mark_As_Root_Request } from '../../../../core/port/driver/request/Mark_As_Root_Request';
import { Back_View_Request } from '../../../../core/port/driver/request/Back_View_Request';
import { Choose_Root_Request } from '../../../../core/port/driver/request/Choose_Root_Request';
import { Link_Project_Request } from '../../../../core/port/driver/request/Link_Project_Request';
import { View_Choose_Root_Request } from '../../../../core/port/driver/request/View_Choose_Root_Request';
import { Root_Dto } from '../../../../core/domain/entities/Root_Dto';
import { Choosen_Root_Request } from '../../../../core/port/driver/request/Choosen_Root_Request';
import { View_Link_Roots_Request } from '../../../../core/port/driver/request/View_Link_Roots_Request';
import { Select_Link_Roots_Request } from '../../../../core/port/driver/request/Select_Link_Roots_Request';

@Injectable({
  providedIn: 'root'
})
export class SvgService 
{
  public readonly dtos : IDto[] = [];
  public readonly roots_dto : IDto[] = [];
  private __flows : string[] = [];
  private __current_flow : string = "";
  private __stack_ids : string[] = [];
  
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

    this.__stack_ids.push(container.id);
  }

  public request_paginate(container : Container) : void
  {
    const request = new Paginate_Request(container);

    const response = Pipeline.facade.execute_paginate(request);

    this.dtos.length = 0;
    
    response.dtos.forEach(dto => this.dtos.push(dto));

    this.__stack_ids.push(container.id);

  } 

  //send ptr is_animating in response??? to prevent recall function while animating???
  public request_vew_paginate(direction : number)
  {
    const request = new View_Paginate_Request(direction);

    const response = Pipeline.facade.execute_view_paginate(request);

    this.dtos.length = 0; 
        
    response.dtos.forEach(dto => this.dtos.push(dto));
  }

  public request_move_ligature(e : MouseEvent, ligature : Ligature) : void
  {    
    const request = new Move_ligature_Request(Vector_.new([e.clientX, e.clientY]), ligature);

    Pipeline.facade.execute_move_ligature(request);
  }

  public request_assign_ligature(ligature : Ligature, container : Container | null) : void
  {
    const request = new Assign_Ligature_Request(ligature, container);

    Pipeline.facade.execute_assign_ligature(request);
  }

  public request_mark_as_root(container : Container) : void
  {
    const request = new Mark_As_Root_Request(container);
    const response = Pipeline.facade.execute_mark_as_root(request);

    this.dtos.length = 0; 
        
    this.dtos.push(response.dto);
  }

  private __request_get_flows() : void
  {
    const response = Pipeline.facade.execute_get_flows();
    this.__flows = response.flows;
    this.__current_flow = response.current_flow;

  }

  public request_back_view() : void
  {
    const container_id : string | undefined = this.__stack_ids.pop();

    if ( !container_id ) return;

    const request = new Back_View_Request(container_id);

    const response = Pipeline.facade.execute_back_view(request);

    this.dtos.length = 0;      
    
    response.dtos.forEach(dto => this.dtos.push(dto)); 
  }

  public request_init_choose_root(container : Container) : void
  {
    const request = new Choose_Root_Request(container);

    const response = Pipeline.facade.execute_init_choose_root(request);
    
    response.dtos.forEach(dto => this.roots_dto.push(dto)); 
  }

  public request_link_project(project_id : string) : void 
  {
    const request = new Link_Project_Request("");

    Pipeline.facade.execute_link_project(request);
  }

  public request_view_choose_root(direction : number) : void
  {
    const request = new View_Choose_Root_Request(direction);

    const response = Pipeline.facade.execute_view_choose_root(request);  

    this.roots_dto.length = 0;

    response.dtos.forEach(dto => this.roots_dto.push(dto)); 
  }

  public request_choose_root(root : Root_Dto)
  {
    const request = new Choosen_Root_Request(root.root_id);

    const response = Pipeline.facade.execute_choose_root(request);

    this.dtos.length = 0; 
    this.roots_dto.length = 0;     
    
    response.dtos.forEach(dto => this.dtos.push(dto)); 
  }

  public request_init_link_roots() : void
  {
    const response = Pipeline.facade.execute_init_link_roots();

    this.dtos.length = 0; 

    response.dtos.forEach(dto => this.dtos.push(dto)); 
  }

  public request_view_links_roots(direction : number)
  {
    const request = new View_Link_Roots_Request(direction);

    const response = Pipeline.facade.execute_view_link_roots(request);

    this.dtos.length = 0; 

    response.dtos.forEach(dto => this.dtos.push(dto)); 
  }

  public request_select_links_roots(container : Container) : void
  {
    const request = new Select_Link_Roots_Request(container);

    const response = Pipeline.facade.execute_select_link_roots(request);

    this.dtos.length = 0; 

    response.dtos.forEach(dto => this.dtos.push(dto));
  }
}

