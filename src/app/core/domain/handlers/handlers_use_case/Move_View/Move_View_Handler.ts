import { Vector } from '../../../../common/Vector/Vector';
import { IMove_View_Handler } from "./IMove_View_Handler";
import { IMove_View_Repository } from '../../../repository/interfaces/IRepository';
import { IData_Tree } from "../View_As_Root/IData_Tree";
import { IMove_View_Positions } from './IMove_View_Positions';
import { Ptr } from '../../../../common/Ptr';


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
        const completed : Ptr<boolean> = this.__repository.init_stop_move_view_condition();

        while(1)
        {
            if ( completed._ ) break;

            this.move_view_by_delta(delta);

            await new Promise(r => setTimeout(r,1));
        }
    }

    public stop_move_view() : void
    {
        this.__repository.set_stop_move_view_condition_to(true);
    }

    public move_the_subtree_by_delta(data_to_merge: IData_Tree[], delta: Vector<3>): void 
    {
        const positions : IMove_View_Positions[] = this.__repository.get_move_view_positions_from_subtree(data_to_merge);

        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }
}

