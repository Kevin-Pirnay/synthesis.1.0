import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector_ } from "../../common/Vector/Vector_";
import { Ligature_ } from "../handlers/handlers_entities/Ligature_";
import { Container } from "./Container";


export class Ligature
{
    public readonly __ = new Ligature_(this);

    public readonly id : string;

    public readonly positions = new Ligature_Positions();

    public parent : Container;
    
    public child : Container

    constructor(id : string, parent : Container, child : Container) 
    { 
        this.id = id;
        this.parent = parent;
        this.child = child;
    }
}

export class Ligature_Positions
{
    public readonly abs_ratio : Matrix<3> = Matrix_.new([Vector_.zero(3), Vector_.zero(3), Vector_.zero(3)]);
}


