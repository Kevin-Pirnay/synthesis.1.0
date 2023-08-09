import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container } from "./Container";
import { Ligature_ } from "../handlers/Ligature_";

export class Ligature
{
    public readonly __ = new Ligature_(this);

    public readonly id : string;

    public readonly positions = new Positions();

    public parent : Container;
    
    public readonly child : Container

    constructor(id : string, parent : Container, child : Container) 
    { 
        this.id = id;
        this.parent = parent;
        this.child = child;
    }
}

class Positions
{
    public readonly abs_ratio : Matrix<3> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}