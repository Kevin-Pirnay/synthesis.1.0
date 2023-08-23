import { Vector } from '../../../../common/Vector/Vector';
import { IMove_View_Handler } from "./IMove_View_Handler";
import { Ptr_Boolean } from '../../../../common/Ptr_Boolean';
import { IMove_View_Repository } from '../../../repository/interfaces/IRepository';


export class Move_View_Handler implements IMove_View_Handler
{
    constructor(private readonly __repository : IMove_View_Repository) { }

    public move_view_by_delta(delta : Vector<2>) : void
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_move_views_positions();

        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }

    public async move_view_by_delta_in_contious_async(delta : Vector<3>) : Promise<void>
    {
        const ptr_condition : Ptr_Boolean = this.__repository.init_stop_move_view_condition();

        while(1)
        {
            if ( ptr_condition.value ) break;

            this.move_view_by_delta(delta);

            await new Promise(r => setTimeout(r,1));
        }
    }

    public stop_move_view() : void
    {
        this.__repository.set_stop_move_view_condition_to(true);
    }
}

export interface IMove_View_Positions
{
    move_by_delta(delta : Vector<2>) : void;
}