import { Injectable } from '@angular/core';
import { IDto } from '../../../../core/port/driver/dto/IDto';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  public readonly dtos : IDto[];

  
}
