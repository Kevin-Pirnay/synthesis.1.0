import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "./INode_Linker";

export class Node_Linker implements INode_Linker
{
    public link_nodes(parent_container: Container | null, ligature: Ligature, child_container: Container) : void
    {
        if ( !parent_container ) return;

        const child_unit = new Unit_Node(crypto.randomUUID(), ligature, child_container);
        const parent_unit = new Unit_Node(crypto.randomUUID(), ligature, parent_container);

        parent_container.node.children.push(child_unit);
        child_container.node.parent = parent_unit;

        ligature.parent = parent_container;
    }

    public link_parent_to_children(container_to_remove : Container): void 
    {
        const parent_container : Container | undefined = container_to_remove.node.parent?.container;
        const children_unit = container_to_remove.node.children;

        if ( !parent_container ) return;

        children_unit.forEach((unit : Unit_Node) =>
        {
            unit.ligature.parent = parent_container;
            
            this.link_nodes(parent_container, unit.ligature, unit.container);
        });
    }

    public remove_unit_from_parent(container_to_remove : Container): void 
    {
        const parent_container : Container | undefined = container_to_remove.node.parent?.container;

        if(! parent_container) return; 

        parent_container.node.children = parent_container.node.children.filter(unit => unit.container.id != container_to_remove.id);
    }

    public remove_unit_from_children(container_to_remove : Container): void 
    {
        const children_container : Container[] = container_to_remove.node.children.map(unit => unit.container);

        children_container.forEach(container =>
        {
            container.node.parent = null;
        });
    }

    public get_container_units(container : Container): Unit_Node | null
    {
        const parent_container : Container | undefined = container.node.parent?.container;

        if(! parent_container) return null;

        let result : Unit_Node | null = null;

        parent_container.node.children.forEach(unit =>
        {
            if(unit.container.id === container.id) result = unit;
        });
        
        return result;
    }
}