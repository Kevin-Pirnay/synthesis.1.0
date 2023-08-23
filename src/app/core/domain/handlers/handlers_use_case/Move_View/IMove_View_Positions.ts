import { Vector } from '../../../../common/Vector/Vector';


export interface IMove_View_Positions {
    move_by_delta(delta: Vector<2>): void;
}
