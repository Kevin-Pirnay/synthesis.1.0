import { Delete_Container_Request } from "../../port/driver/request/Delete_Container_Request";
import { Delete_Container_Response } from "../../port/driver/response/Delete_Container_Response";
import { Container, Unit_Node } from "../entities/Container";
import { INode_Linker } from "../handlers/Link_Node/INode_Linker";
import { IDelete_Container_Repository } from "../repository/interfaces/IDelete_Repository";

export class Delete_Container_Use_case
{
    constructor(
        private readonly __delete_repository : IDelete_Container_Repository,
        private readonly __node_linker_handler : INode_Linker) { }

    public handle(request : Delete_Container_Request) : Delete_Container_Response
    {
        const c_to_remove : Container = request.container;

        const children_unit : Unit_Node[] = c_to_remove.node.children;

        const children_container : Container[] = children_unit.map(unit => unit.container);

        const parents_containers : Container[] = c_to_remove.node.parents.map(unit => unit.container);
        //************************************************************************************************
        // *** WARNING : bug until implementation flow : cannot hanve more than one parent
        const unit_to_remove : Unit_Node[] = this.__delete_repository.get_container_units(parents_containers, c_to_remove);
        //************************************************************************************************

        //remove unit from the container parent and link children to parent
        this.__node_linker_handler.remove_unit_from_parent(parents_containers, c_to_remove);
        this.__node_linker_handler.remove_unit_from_children(children_container, c_to_remove);
        this.__node_linker_handler.link_parent_to_children(parents_containers[0], children_unit);

        //update positions children ligatures
        children_unit.forEach(unit => unit.ligature.__.update_ratio());
        
        //************************************************************************************************
        // *** WARNING : bug until implementation flow : cannot hanve more than one parent
        //remove unit from the memory
        this.__delete_repository.delete_unit(unit_to_remove[0]);

        return new Delete_Container_Response([unit_to_remove[0].container.id, unit_to_remove[0].ligature.id]);
        //***********************************************************************************************
    }
}