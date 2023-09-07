import { Injectable } from '@angular/core';
import { __assign } from 'tslib';
import { Svg } from './svg/Svg';
import { Aside } from './aside/Aside';
import { Navigation } from './navigation/Navigation';

@Injectable({
  providedIn: 'root'
})


export class DataService
{
  public readonly svg : Svg;
  public readonly aside : Aside;
  public readonly navigation : Navigation;

  constructor() 
  { 
    this.svg = new Svg();
    this.aside = new Aside();
    this.navigation = new Navigation();
  }
}