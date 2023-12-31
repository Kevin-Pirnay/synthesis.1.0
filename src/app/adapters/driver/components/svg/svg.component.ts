import { AfterViewChecked, Component, DoCheck } from '@angular/core';
import { StateService } from './../../services/state/state.service';
import { IDto } from '../../../../core/port/driver/dto/IDto';
import { DataService } from '../../services/data/data.service';
import { Ligature } from '../../../../core/domain/entities/Ligature';
import { Container } from '../../../../core/domain/entities/Container';
import { Root_Choice } from '../../../../core/domain/entities/Root_Choice';
import { stack_anim } from "../../services/data/svg/memory/stack_anim";


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements AfterViewChecked
{
  public readonly dtos : IDto[];
  public readonly roots_choices : IDto[];
  public readonly window_width : number;
  public readonly window_height : number;


  constructor(data : DataService, private readonly __state : StateService) 
  { 
    this.dtos = data.svg.__.dtos.common_dtos;

    this.roots_choices = data.svg.__.dtos.roots_choices;

    this.window_width = window.innerWidth;

    this.window_height = window.innerHeight;    
  }

  public ngAfterViewChecked(): void 
  {
    stack_anim.execute_stack();
    stack_anim.execute_stack_async();
  }

  public mouse_up(e : MouseEvent) : void
  {
    this.__state.from_svg.mouse.report_mouse_up(e);
  }

  public mouse_move(e : MouseEvent) : void
  {
    this.__state.from_svg.mouse.report_mouse_move(e);
  }

  public mouse_down_on_container(container : Container) : void
  {
    this.__state.from_svg.mouse.report_mouse_down_on_container(container);
  }

  public mouse_down_on_ligature(ligature : Ligature) : void
  {
    this.__state.from_svg.mouse.report_mouse_down_on_ligature(ligature);
  }

  public mouse_down_on_grip(ligature : Ligature) : void
  {
    this.__state.from_svg.mouse.report_mouse_down_on_grip(ligature);
  }

  public mouse_over_container(container : Container) : void
  {
    this.__state.from_svg.mouse.report_mouse_over_container(container);
  }

  public key_down(e : KeyboardEvent) : void
  {
    this.__state.from_svg.key.report_key_down(e);
  }

  public key_up() : void
  {
    this.__state.from_svg.key.report_key_up();
  }

  public mouse_down_on_root_choice(root : Root_Choice) : void
  {
    this.__state.from_svg.mouse.report_mouse_down_on_root_choice(root);
  }
}

