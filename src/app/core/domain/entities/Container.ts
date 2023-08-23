import { Node_ } from './../handlers/handlers_entities/Node_';
import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container_ } from "../handlers/handlers_entities/Container_";
import { Ligature } from "./Ligature";

export class Container
{
    public readonly __ = new Container_(this);

    public readonly id : string;

    public positions = new Container_Positions();

    public node = new Node();

    public readonly roots : string[] = [];

    public back_root : string | null = null;

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
    public readonly rel_root : Vector<3> = Vector_.zero(3);

    public readonly rel_ratio : Matrix<4> = Matrix_.new([Vector_.zero(3), Vector_.zero(3), Vector_.zero(3), Vector_.zero(3)]);

    public readonly abs_root : Vector<3> = Vector_.zero(3);

    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(3), Vector_.zero(3), Vector_.zero(3), Vector_.zero(3)]);
}