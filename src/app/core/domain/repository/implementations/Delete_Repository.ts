import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Unit_Node, Container } from "../../entities/Container";
import { IDelete_Container_Repository } from "../interfaces/IDelete_Repository";

//maybe need to centralise all what is relative to link and unlink children and parent container  -> into link handler???

export class Delete_Container_Repository implements IDelete_Container_Repository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }
    
    public delete_unit(unit_to_remove: Unit_Node): void 
    {
        this.__dao_container.delete(unit_to_remove.container);
        this.__dao_ligature.delete(unit_to_remove.ligature);
    }

    public link_parent_to_children(parent_container: Container, children_unit: Unit_Node[]): void 
    {
        children_unit.forEach(unit =>
        {
            unit.ligature.parent = parent_container;
            //waring bug error undfined if this is the root that you remove
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