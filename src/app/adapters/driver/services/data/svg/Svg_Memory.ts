import { Container } from "../../../../../core/domain/entities/Container";
import { Ligature } from "../../../../../core/domain/entities/Ligature";
import { IDto } from "../../../../../core/port/driver/dto/IDto";

export class Svg_Memory
{
    public mouse_current_state = Svg_State_Mouse.UP;
    public current_event = Svg_Current_Event.NONE;
    public focus_container: Container | null = null;
    public focus_ligature: Ligature | null = null;
    public readonly common_dtos: IDto[] = [];
    public readonly roots_choices: IDto[] = [];
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
  ZOOMING,
  VIEW_MOVING_LEFT,
  VIEW_MOVING_RIGTH,
  VIEW_MOVING_UP,
  VIEW_MOVING_DOWN,
  LINKING_ROOTS,
  NONE
}
