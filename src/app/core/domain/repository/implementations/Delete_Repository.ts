import { Unit_Node, Container } from "../../entities/Container";
import { IDelete_Container_Repository } from "../interfaces/IDelete_Repository";

export class Delete_Container_Repository implements IDelete_Container_Repository
{
    link_parent_to_children(parent_container: Container, children_unit: Unit_Node[]): void 
    {
        children_unit.forEach(unit =>
        {
            unit.ligature.parent = parent_container;
            parent_container.__.link_node_unit(unit.ligature, unit.container);
        });
    }

    public get_container_units(parents_containers: Container[], c_to_remove: Container): Unit_Node[] 
    {
        const result : Unit_Node[] = [];

        parents_containers.forEach(container => container.node.children.forEach(unit =>
        {
            if(unit.container.id == c_to_remove.id) result.push(unit);
        }));

        return result;
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