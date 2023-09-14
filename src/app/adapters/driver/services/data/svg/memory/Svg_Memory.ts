import { Ptr } from "../../../../../../core/common/Ptr";
import { Container } from "../../../../../../core/domain/entities/Container";
import { Ligature } from "../../../../../../core/domain/entities/Ligature";
import { IDto } from "../../../../../../core/port/driver/dto/IDto";

export class Svg_Memory
{
    public mouse_current_state : Ptr<Svg_State_Mouse> = new Ptr(Svg_State_Mouse.UP);
    public current_event : Ptr<Svg_Current_Event> = new Ptr(Svg_Current_Event.NONE);
    public current_event_navigation : Ptr<Svg_Current_Event_Navigation> = new Ptr(Svg_Current_Event_Navigation.NONE);
    public focus_container: Container | null = null;
    public focus_ligature: Ligature | null = null;
    public current_parent_container : Container | null = null;
    public readonly common_dtos: IDto[] = [];
    public readonly roots_choices: IDto[] = [];
    public readonly containers_selected : Container[] = [];
}

export enum Svg_State_Mouse
{
  DOWN_ON_CONTAINER,
  DOWN_ON_LIGATURE,
  DOWN_ON_ROOT_CHOICE,
  DOWN_ON_GRIP,
  UP
}

export enum Svg_Current_Event_Navigation 
{
  VIEW_MOVING_LEFT,
  VIEW_MOVING_RIGTH,
  VIEW_MOVING_UP,
  VIEW_MOVING_DOWN,
  ZOOMING_UP,
  ZOOMING_DOWN,
  NONE
}

export enum Svg_Current_Event
{
  LINKING_ROOTS,
  CHOOSING_ROOT,
  PAGINATE,
  NONE
}
