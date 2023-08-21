import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent 
{
  //put that in data
  public is_showing_menu : boolean = true;
  public is_showing_back_view : boolean = false;

  private __reset_show() : void
  {
    this.is_showing_menu = false;
    this.is_showing_back_view = false;
  }

  public click_on_show_menu() : void
  {
    this.__reset_show();

    this.is_showing_menu = true;
  }

  public click_on_show_back_view() : void
  {
    this.__reset_show();

    this.is_showing_back_view = true;
  }
}
