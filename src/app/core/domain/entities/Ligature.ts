import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container } from "./Container";

export class Ligature_
{
    public static new(parent : Container, child : Container) : Ligature
    {
        const id = crypto.randomUUID();

        const ligature = new Ligature(id, parent, child);

        ligature.positions.abs_ratio.__.assign_new_data(this.__get_abs_ratio(ligature));

        return ligature;
    }

    private static __get_abs_ratio(ligature : Ligature) : Matrix<3>
    {
        const parent_pos : Matrix<4> = ligature.parent.positions.abs_ratio;

        const child_pos : Matrix<4> = ligature.child.positions.abs_ratio;

        const a : Vector = parent_pos._[1].__.add_by_vector_new(parent_pos._[2]).__.multiply_by_factor(1/2);

        const c : Vector = child_pos._[0].__.add_by_vector_new(child_pos._[3]).__.multiply_by_factor(1/2);

        const b : Vector = Vector_.new([1/2 * (parent_pos._[0]._[0] + child_pos._[0]._[0]), 1/2 * (child_pos._[3]._[1] + child_pos._[3]._[1])]);

        return Matrix_.new([a,b,c])
    }

    constructor(private readonly __ligature : Ligature) { }

    public update_ratio() : void
    {        
        this.__ligature.positions.abs_ratio.__.assign_new_data(Ligature_.__get_abs_ratio(this.__ligature));
    }
}

export class Ligature
{
    public readonly __ = new Ligature_(this);

    public readonly id : string;

    public readonly positions = new Position();

    public parent : Container;
    
    public readonly child : Container

    constructor(id : string, parent : Container, child : Container) 
    { 
        this.id = id;
        this.parent = parent;
        this.child = child;
    }
}

class Position
{
    public readonly abs_ratio : Matrix<3> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}