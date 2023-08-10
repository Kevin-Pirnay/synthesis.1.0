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

    public positions = new Container_Positions();

    public node = new Node();

    public readonly root : string[] = [];

    constructor(id: string) { this.id = id; }
}

export class Unit_Node
{
    constructor(public ligature : Ligature | null = null, public container : Container | null = null) { }
}

class Node_
{
    constructor(private readonly __node : Node) { }

    public assign_new_parent_unit(parent : Unit_Node | null) : void
    {
        if(parent == null) 
        {
            this.__node.parent.container = null;
            this.__node.parent.ligature = null;
            return;
        }

        this.__node.parent.container = parent.container;
        this.__node.parent.ligature = parent.ligature;
    }

    public assign_new_children_unit(children : Unit_Node[]) : void
    {
        this.__node.children.length = 0;

        children.forEach((child : Unit_Node) => this.__node.children.push(child));
    }

    public get_containers_children() : Container[]
    {
        const result : Container[] = [];

        this.__node.children.forEach(unit =>
        {
            if ( unit.container !== null ) result.push(unit.container); 
        });

        return result;
    }
}

export class Node
{
    public __ = new Node_(this);

    public readonly parent : Unit_Node;

    public readonly children : Unit_Node[] = [];
}

export class Container_Positions
{
    public readonly rel_root : Vector = Vector_.zero(); // from the c_a parent for ligature or c_l point for container

    public readonly rel_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);

    public readonly abs_root : Vector = Vector_.zero();

    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}