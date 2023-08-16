import { Injectable } from '@angular/core';
import { Container } from '../../../../core/domain/entities/Container';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { RequestService } from '../request/request.service';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService 
{
  private __is_down_on_container : boolean = false;
  private __is_down_on_grip : boolean = false;
  private __focus_container : Container | null = null;
  private __focus_ligature : Ligature | null = null;

  //constructor(private readonly __request : RequestService, private readonly __data : DataService) { }


}
