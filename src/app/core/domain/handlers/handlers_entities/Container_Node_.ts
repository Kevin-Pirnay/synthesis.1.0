import { Container_Node, Unit_Node, Container } from "../../entities/Container";


export class Container_Node_ 
{
    constructor(private readonly __node: Container_Node) { }

    public assign_new_parent_unit(parent: Unit_Node | null): void 
    {
        if (parent == null) 
        {
            this.__node.parent.container = null;
            this.__node.parent.ligature = null;
            return;
        }

        this.__node.parent.container = parent.container;
        this.__node.parent.ligature = parent.ligature;
    }

    public assign_new_children_unit(children: Unit_Node[]): void 
    {
        this.__node.children.length = 0;

        children.forEach((child: Unit_Node) => this.__node.children.push(child));
    }

    public get_containers_children(): Container[] 
    {
        const result: Container[] = [];

        this.__node.children.forEach(unit => 
        {
            if (unit.container !== null) result.push(unit.container);
        });

        return result;
    }

    public get_children_units(): Unit_Node[] 
    {
        const result: Unit_Node[] = [];

        this.__node.children.forEach(unit => 
        {
            if (unit.container !== null && unit.ligature !== null) result.push(unit);
        });

        return result;
    }

    public copy() : Container_Node
    {
        const new_node_ptr = new Container_Node();

        new_node_ptr.parent.container = this.__node.parent.container;
        new_node_ptr.parent.ligature = this.__node.parent.ligature;

        this.__node.children.forEach((child : Unit_Node) => new_node_ptr.children.push(child));

        return new_node_ptr;
    }
}
