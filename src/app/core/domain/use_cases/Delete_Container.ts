import { Delete_Container_Request } from "../../port/driver/request/Delete_Container_Request";
import { Delete_Container_Response } from "../../port/driver/response/Delete_Container_Response";
import { Container, Unit_Node } from "../entities/Container";
import { INode_Linker } from "../handlers/Link_Node/INode_Linker";
import { Node_Linker } from "../handlers/Link_Node/Node_Linker";
import { IDelete_Container_Repository } from "../repository/interfaces/IDelete_Repository";

/**
 * 
 * step 1: remove unit from parent and chidren
 * step 2: link the parent node to the children node : by default the children will be link to the first parent
 * step 2: update position ligatures
 * step 3: remove unit from memory
 */

export class Delete_Container_Use_case
{
    constructor(
        private readonly __delete_repository : IDelete_Container_Repository,
        private readonly __node_linker_handler : INode_Linker) { }

    public handle(request : Delete_Container_Request) : Delete_Container_Response
    {
        const remove_container : IRemove_Container = Remove_Container.get_remove_container(request.container, this.__node_linker_handler, this.__delete_repository);

        remove_container.remove_all_units_that_contain_the_container_from_the_tree();
        remove_container.link_the_parent_node_to_the_children_node();
        remove_container.update_children_ligatures_positions();
        remove_container.remove_container_from_memory();

        return remove_container.get_delete_container_response();
    }
}

interface IRemove_Container
{
    remove_all_units_that_contain_the_container_from_the_tree() : void;
    link_the_parent_node_to_the_children_node() : void;
    update_children_ligatures_positions() : void;
    remove_container_from_memory() : void;
    get_delete_container_response() : Delete_Container_Response;
}

class Remove_Container implements IRemove_Container
{
    public static get_remove_container(container_to_remove : Container, handler : Node_Linker, delete_repository: IDelete_Container_Repository) : Remove_Container
    {
        return new Remove_Container(container_to_remove, handler, delete_repository);
    }

    private readonly __container_to_remove : Container;
    private readonly __handler : Node_Linker;
    private readonly __delete_repository: IDelete_Container_Repository;

    private readonly __children_unit: Unit_Node[];
    private readonly __parents_containers: Container[]; 
    private readonly __children_container: Container[];
    private readonly __unit_to_remove : Unit_Node[]; 

    constructor(
        container_to_remove : Container, 
        handler : Node_Linker, 
        delete_repository: IDelete_Container_Repository) 
    { 
        this.__container_to_remove = container_to_remove;
        this.__handler = handler;
        this.__delete_repository = delete_repository;

        this.__children_unit = this.__container_to_remove.node.children;
        this.__parents_containers = container_to_remove.node.parents.map(unit => unit.container);
        this.__children_container = container_to_remove.node.children.map(unit => unit.container);
        
        // *** WARNING : bug until implementation flow : cannot hanve more than one parent
        this.__unit_to_remove = this.__get_container_units();
    }

    public update_children_ligatures_positions(): void 
    {
        this.__children_unit.forEach(unit => unit.ligature.__.update_ratio());
    }

    public remove_container_from_memory(): void 
    {
        // *** WARNING : bug until implementation flow : cannot hanve more than one parent
        this.__delete_repository.delete_unit(this.__children_unit[0]);
    }

    public remove_all_units_that_contain_the_container_from_the_tree() : void
    {
        this.__handler.remove_unit_from_parent(this.__parents_containers, this.__container_to_remove);
        this.__handler.remove_unit_from_children(this.__children_container, this.__container_to_remove);
    }

    public link_the_parent_node_to_the_children_node() : void
    {
        this.__handler.link_parent_to_children(this.__parents_containers[0], this.__children_unit);
    }

    public get_delete_container_response(): Delete_Container_Response 
    {   
        // *** WARNING : bug until implementation flow : cannot hanve more than one parent
        return new Delete_Container_Response([this.__unit_to_remove[0].container.id, this.__unit_to_remove[0].ligature.id]);
    }

    // *** WARNING : bug until implementation flow : cannot hanve more than one parent
    // should be only one unit to remove
    private __get_container_units(): Unit_Node[] 
    {
        const result : Unit_Node[] = [];

        this.__parents_containers.forEach(container => container.node.children.forEach(unit =>
        {
            
            if(unit.container.id == this.__container_to_remove.id) result.push(unit);
        }));
        
        return result;
    }
}