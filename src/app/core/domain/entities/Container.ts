import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container_ } from "../handlers/Container_";
import { Ligature } from "./Ligature";
import { Node_ } from "../handlers/Node_";

export class Container
{
    public readonly __ = new Container_(this);

    public readonly id : string;

    public positions = new Container_Positions();

    public node = new Node();

    public readonly root : string[] = [];

    constructor(id: string) { this.id = id; }
}

export class Unit_Node
{
    constructor(public ligature : Ligature | null = null, public container : Container | null = null) { }
}

export class Node
{
    public __ = new Node_(this);

    public readonly parent : Unit_Node = new Unit_Node();

    public readonly children : Unit_Node[] = [];
}

export class Container_Positions
{
    public readonly rel_root : Vector = Vector_.zero(); // from the c_a parent for ligature or c_l point for container

    public readonly rel_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);

    public readonly abs_root : Vector = Vector_.zero();

    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}