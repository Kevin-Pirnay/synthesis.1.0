import { Container, Unit_Node } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { INode_Linker } from "./INode_Linker";

export class Node_Linker implements INode_Linker
{
    public link_nodes(parent_container: Container, ligature: Ligature, child_container: Container): void 
    {
        Link_Handler.link_parent_and_unit(parent_container, ligature, child_container);
    }

    public link_parent_to_children(container_to_remove: Container): void 
    {
        Link_Handler.link_parent_to_children_units(container_to_remove);
    }

    public remove_unit_from_parent(container_to_remove: Container): void 
    {
        Remove_Handler.remove_unit_from_parent(container_to_remove);
    }

    public remove_unit_from_children(container_to_remove: Container): void 
    {
        Remove_Handler.remove_unit_from_children(container_to_remove);
    }

    public remove_unit_from_child(child_container: Container): void 
    {
        Remove_Handler.remove_unit_from_child(child_container);
    }

    public get_container_units(container: Container) : Unit_Node | null
    {
        return Get_Handler.get_container_units(container);
    }
}

class Link_Handler
{
    public static link_parent_and_unit(parent_container: Container | null, ligature: Ligature | null, child_container: Container | null) : void
    {
        if ( !parent_container || !ligature || !child_container ) return;

        const child_unit = new Unit_Node(ligature, child_container);
        
        const parent_unit = new Unit_Node(ligature, parent_container);

        parent_container.node.children.push(child_unit);

        child_container.node.__.assign_new_parent_unit(parent_unit);

        ligature.parent = parent_container;
    }

    public static link_parent_to_children_units(container_to_remove : Container): void 
    {
        const parent_container : Container | null = container_to_remove.node.parent.container;
        
        const children_unit = container_to_remove.node.children;

        if ( !parent_container ) return;

        children_unit.forEach((child_unit : Unit_Node) =>
        {            
            Link_Handler.link_parent_and_unit(parent_container, child_unit.ligature, child_unit.container);
        });
    }
}

class Remove_Handler
{
    public static remove_unit_from_parent(container_to_remove : Container): void 
    {
        const parent_container : Container | null = container_to_remove.node.parent?.container;

        if(! parent_container) return; 

        const index = parent_container.node.children.findIndex((unit : Unit_Node) => unit.container?.id === container_to_remove.id);
        
        parent_container.node.children.splice(index, 1);
    }

    public static remove_unit_from_children(container_to_remove : Container): void 
    {
        const children_container : Container[] = container_to_remove.node.__.get_containers_children();

        children_container.forEach(container =>
        {
            container.node.__.assign_new_parent_unit(null);
        });
    }

    public static remove_unit_from_child(child_container : Container) : void
    {
        child_container.node.__.assign_new_parent_unit(null);
    }
}

class Get_Handler
{
    public static get_container_units(container : Container): Unit_Node | null
    {
        const parent_container : Container | null = container.node.parent?.container;

        if (! parent_container) return null;

        let result : Unit_Node | null = null;

        parent_container.node.children.forEach(unit =>
        {
            if (unit.container?.id === container.id) result = unit;
        });
        
        return result;
    }
}