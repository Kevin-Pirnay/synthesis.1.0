import { IMove_View_Positions, Ptr_Boolean } from "../../handlers/handlers_use_case/Move_View/Move_View_Handler";


export interface IMove_View_Repository
{
    init_stop_move_view_condition(): Ptr_Boolean;
    get_all_move_views_positions(): IMove_View_Positions[];
    set_stop_move_view_condition_to(value : boolean) : void
}