import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container } from "../entities/Container";
import { Ligature } from "../entities/Ligature";


export class Ligature_ 
{
    public static new = (parent: Container, child: Container): Ligature => { return Creation.new(parent, child); }

    constructor(private readonly __ligature: Ligature) { }

    public update_ratio = (): void => { Position.update_ratio(this.__ligature) }
}

class Position
{
    public static __get_abs_ratio(ligature: Ligature): Matrix<3> 
    {
        const parent_pos: Matrix<4> = ligature.parent.positions.abs_ratio;

        const child_pos: Matrix<4> = ligature.child.positions.abs_ratio;

        const a: Vector = parent_pos._[1].__.add_by_vector_new(parent_pos._[2]).__.multiply_by_factor(1 / 2);

        const c: Vector = child_pos._[0].__.add_by_vector_new(child_pos._[3]).__.multiply_by_factor(1 / 2);

        const b: Vector = Vector_.new([1 / 2 * (parent_pos._[0]._[0] + child_pos._[0]._[0]), 1 / 2 * (child_pos._[3]._[1] + child_pos._[3]._[1])]);

        return Matrix_.new([a, b, c]);
    }

    public static update_ratio(ligature : Ligature): void 
    {
        ligature.positions.abs_ratio.__.assign_new_data(Position.__get_abs_ratio(ligature));
    }
}

class Creation
{
    public static new(parent: Container, child: Container): Ligature 
    {
        const ligature = new Ligature(crypto.randomUUID(), parent, child);

        ligature.positions.abs_ratio.__.assign_new_data(Position.__get_abs_ratio(ligature));

        return ligature;
    }
}