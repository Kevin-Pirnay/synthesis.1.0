import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container_ } from "../handlers/Container_";
import { Ligature } from "./Ligature";

export class Container
{
    public readonly __ = new Container_(this);

    public readonly id : string;

    public readonly positions = new Positions();

    public readonly node = new Node();

    constructor(id: string) { this.id = id; }
}

export class Unit_Node
{
    constructor(public readonly id : string, public readonly ligature : Ligature, public readonly container : Container) { }
}

class Node
{
    parents : Unit_Node[] = [];

    children : Unit_Node[] = [];
}

class Positions
{
    public readonly rel_root : Vector = Vector_.zero(); // from the c_a parent for ligature or c_l point for container

    public readonly rel_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);

    public readonly abs_root : Vector = Vector_.zero();

    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}