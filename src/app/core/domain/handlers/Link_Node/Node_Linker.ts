import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "./INode_Linker";

export class Node_Linker implements INode_Linker
{
    public link_nodes(parent_container: Container, ligature: Ligature, child_container: Container) : void
    {
        const child_unit = new Unit_Node(crypto.randomUUID(), ligature, child_container);
        const parent_unit = new Unit_Node(crypto.randomUUID(), ligature, parent_container);

        parent_container.node.children.push(child_unit);
        child_container.node.parents.push(parent_unit);
    }

    public link_parent_to_children(parent_container: Container, children_unit: Unit_Node[]): void 
    {
        children_unit.forEach(unit =>
        {
            unit.ligature.parent = parent_container;
            //waring bug error undfined if this is the root that you remove
            this.link_nodes(parent_container, unit.ligature, unit.container);
        });
    }

    public remove_unit_from_parent(parents_containers: Container[], c_to_remove: Container): void 
    {
        parents_containers.forEach(container =>
        {
            container.node.children = container.node.children.filter(unit => unit.container.id != c_to_remove.id);
        });
    }

    public remove_unit_from_children(children_container: Container[], c_to_remove: Container): void 
    {
        children_container.forEach(container =>
        {
            container.node.parents = container.node.parents.filter(unit => unit.container.id != c_to_remove.id);
        });
    }
}