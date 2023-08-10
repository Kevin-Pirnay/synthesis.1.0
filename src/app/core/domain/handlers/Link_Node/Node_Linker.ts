import { Container, Unit_Node } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { INode_Linker } from "./INode_Linker";

export class Node_Linker implements INode_Linker
{
    public link_nodes(parent_container: Container | null, ligature: Ligature | null, child_container: Container | null) : void
    {
        if ( !parent_container || !ligature || !child_container ) return;

        const child_unit = new Unit_Node(ligature, child_container);
        const parent_unit = new Unit_Node(ligature, parent_container);

        parent_container.node.children.push(child_unit);
        child_container.node.__.assign_new_parent_unit(parent_unit);

        ligature.parent = parent_container;
    }

    public link_parent_to_children(container_to_remove : Container): void 
    {
        const parent_container : Container | null = container_to_remove.node.parent.container;
        const children_unit = container_to_remove.node.children;

        if ( !parent_container ) return;

        children_unit.forEach((child_unit : Unit_Node) =>
        {            
            this.link_nodes(parent_container, child_unit.ligature, child_unit.container);
        });
    }

    public remove_unit_from_parent(container_to_remove : Container): void 
    {
        const parent_container : Container | null = container_to_remove.node.parent?.container;

        if(! parent_container) return; 

        const index = parent_container.node.children.findIndex((unit : Unit_Node) => unit.container?.id === container_to_remove.id);
        
        parent_container.node.children.splice(index, 1);
    }

    public remove_unit_from_children(container_to_remove : Container): void 
    {
        const children_container : Container[] = container_to_remove.node.__.get_containers_children();

        children_container.forEach(container =>
        {
            container.node.__.assign_new_parent_unit(null);
        });
    }

    public get_container_units(container : Container): Unit_Node | null
    {
        const parent_container : Container | null = container.node.parent?.container;

        if(! parent_container) return null;

        let result : Unit_Node | null = null;

        parent_container.node.children.forEach(unit =>
        {
            if(unit.container?.id === container.id) result = unit;
        });
        
        return result;
    }
}