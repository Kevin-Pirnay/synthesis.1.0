import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RequestService 
{
//   public request_create_container(e : MouseEvent, parent_container : Container | null = null) : void
//   {
//     const request = new Create_Container_Request(Vector_.new([e.clientX, e.clientY]), parent_container);

//     const response = Pipeline.facade.execute_create_container(request);
    
//     response.dtos.forEach(dto => this.dtos.push(dto));    
//   }

//   public request_delete_container(container : Container) : void
//   {
//     const request = new Delete_Container_Request(container);

//     const response = Pipeline.facade.execute_delete_container(request);

//     const new_list = this.dtos.filter(dto => !response.ids_to_remove.includes(dto._.id));

//     this.dtos.length = 0;

//     new_list.forEach(dto => this.dtos.push(dto));
//   }

//   public request_move_container(e : MouseEvent, container : Container) : void
//   {    
//     const request = new Move_Container_Request(Vector_.new([e.clientX, e.clientY]), container);

//     Pipeline.facade.execute_move_container(request);
//   }

//   public request_move_ligature(e : MouseEvent, ligature : Ligature) : void
//   {    
//     const request = new Move_ligature_Request(Vector_.new([e.clientX, e.clientY]), ligature);

//     Pipeline.facade.execute_move_ligature(request);
//   }

//   public request_assign_ligature(ligature : Ligature, container : Container | null) : void
//   {
//     const request = new Assign_Ligature_Request(ligature, container);

//     Pipeline.facade.execute_assign_ligature(request);
//   }

//   public request_move_view(key : string): void
//   { 
//     const request = new Move_View_Request(key);

//     Pipeline.facade.execute_move_view(request);
//   }

//   public request_zoom(direction : number) : void
//   {    
//     const request = new Zoom_Request(direction);

//     Pipeline.facade.execute_zoom(request);
//   }
}
