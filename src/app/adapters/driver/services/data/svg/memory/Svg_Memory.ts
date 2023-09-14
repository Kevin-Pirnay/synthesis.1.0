import { Ptr } from "../../../../../../core/common/Ptr";
import { Container } from "../../../../../../core/domain/entities/Container";
import { Ligature } from "../../../../../../core/domain/entities/Ligature";
import { IDto } from "../../../../../../core/port/driver/dto/IDto";

export class Svg_Memory
{
    public mouse_current_state : Ptr<Svg_State_Mouse> = new Ptr(Svg_State_Mouse.UP);
    public current_event : Ptr<Svg_Current_Event> = new Ptr(Svg_Current_Event.NONE);
    public focus_container: Container | null = null;
    public focus_ligature: Ligature | null = null;
    public current_parent_container : Container | null = null;
    public readonly common_dtos: IDto[] = [];
    public readonly roots_choices: IDto[] = [];
    public readonly containers_selected : Container[] = [];
}

type Anim_Func =  {args : IDto[], func :(dtos : IDto[]) => void};
type Anim_Func_Async =  {args : IDto[], func :(dtos : IDto[]) => Promise<void>};

export class stack_anim
{
  private static __stack : Anim_Func[] = [];
  private static __stack_async : Anim_Func_Async[] = [];

  public static execute_stack() : void
  {
    while(1)
    {
      const anim : Anim_Func | undefined = this.__stack.pop();

      if ( anim == undefined ) break;      

      anim.func(anim.args);
    }
  }
  public static execute_stack_async() : void
  {
    while(1)
    {
      const anim : Anim_Func_Async | undefined = this.__stack_async.pop();

      if ( anim == undefined ) break;

      anim.func(anim.args);
    }
  }

  public static add_animation_function(args : IDto[], func : (dtos : IDto[])=>void)
  {
    this.__stack.push({ args : args, func : func });
  }

  public static add_animation_function_async(args : IDto[], func : (dtos : IDto[])=>Promise<void>)
  {
    this.__stack_async.push({ args : args, func : func });
  }
}

export enum Svg_State_Mouse
{
  DOWN_ON_CONTAINER,
  DOWN_ON_LIGATURE,
  DOWN_ON_ROOT_CHOICE,
  DOWN_ON_GRIP,
  UP
}

export enum Svg_Current_Event 
{
  VIEW_MOVING_LEFT,
  VIEW_MOVING_RIGTH,
  VIEW_MOVING_UP,
  VIEW_MOVING_DOWN,
  ZOOMING_UP,
  ZOOMING_DOWN,
  LINKING_ROOTS,
  CHOOSING_ROOT,
  NONE
}
