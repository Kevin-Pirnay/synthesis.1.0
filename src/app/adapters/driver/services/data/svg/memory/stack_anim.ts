import { IDto } from "../../../../../../core/port/driver/dto/IDto";

export type Anim_Func =  {args : IDto[], func :(dtos : IDto[]) => void};
export type Anim_Func_Async =  {args : IDto[], func :(dtos : IDto[]) => Promise<void>};

export class stack_anim 
{
  private static __stack: Anim_Func[] = [];
  private static __stack_async: Anim_Func_Async[] = [];

  public static execute_stack(): void 
  {
    while (1) 
    {
      const anim: Anim_Func | undefined = this.__stack.pop();

      if (anim == undefined) break;

      anim.func(anim.args);
    }
  }
  public static execute_stack_async(): void 
  {
    while (1) 
    {
      const anim: Anim_Func_Async | undefined = this.__stack_async.pop();

      if (anim == undefined) break;

      anim.func(anim.args);
    }
  }

  public static add_animation_function(args: IDto[], func: (dtos: IDto[]) => void) 
  {
    this.__stack.push({ args: args, func: func });
  }

  public static add_animation_function_async(args: IDto[], func: (dtos: IDto[]) => Promise<void>) 
  {
    this.__stack_async.push({ args: args, func: func });
  }
}
