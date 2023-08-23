import { Vector } from '../../../../common/Vector/Vector';


export interface IZoom_Positions {
    substract_abs_pos_by_delta(delta: Vector<3>): void;
    multiply_abs_pos_by_factor(factor: number): void;
    add_abs_pos_by_delta(delta: Vector<3>): void;
}
