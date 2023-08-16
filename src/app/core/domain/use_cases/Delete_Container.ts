import { Delete_Container_Request } from "../../port/driver/request/Delete_Container_Request";
import { Delete_Container_Response } from "../../port/driver/response/Delete_Container_Response";
import { INode_Linker } from "../handlers/handlers_use_case/Link_Node/INode_Linker";
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
        const remove_container : IRemove_Container = this.__delete_repository.get_remove_container(request.container, this.__node_linker_handler);
        remove_container.remove_all_units_that_contain_itself_from_the_tree();
        remove_container.link_its_parent_node_to_its_children_node();
        remove_container.update_its_children_ligatures_positions();
        remove_container.remove_itself_from_memory();

        return remove_container.get_deleted_container_response();
    }
}

export interface IRemove_Container
{
    remove_all_units_that_contain_itself_from_the_tree() : void;
    link_its_parent_node_to_its_children_node() : void;
    update_its_children_ligatures_positions() : void;
    remove_itself_from_memory() : void;
    get_deleted_container_response() : Delete_Container_Response;
}