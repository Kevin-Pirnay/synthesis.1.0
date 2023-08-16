import { Delete_Container_Response } from "../../../../port/driver/response/Delete_Container_Response";
import { Unit_Node, Container } from "../../../entities/Container";
import { INode_Linker } from "../../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { Node_Linker } from "../../../handlers/handlers_use_case/Link_Node/Node_Linker";
import { IRemove_Container } from "../../../use_cases/Delete_Container";
import { IDelete_Container_Repository } from "../../interfaces/IDelete_Repository";

export class Remove_Container implements IRemove_Container 
{
    private readonly __container_to_remove: Container;
    private readonly __handler: Node_Linker;
    private readonly __delete_repository: IDelete_Container_Repository;

    private readonly __children_unit: Unit_Node[];
    private readonly __unit_to_remove: Unit_Node | null;

    constructor(
        container_to_remove: Container,
        handler: INode_Linker,
        delete_repository: IDelete_Container_Repository
    ) {
        this.__container_to_remove = container_to_remove;
        this.__handler = handler;
        this.__delete_repository = delete_repository;

        this.__children_unit = this.__container_to_remove.node.children;
        this.__unit_to_remove = handler.get_container_units(this.__container_to_remove);
    }

    public update_its_children_ligatures_positions(): void 
    {
        this.__children_unit.forEach(unit => { if (unit.ligature) unit.ligature.__.update_ratio(); });
    }

    public remove_itself_from_memory(): void 
    {
        this.__delete_repository.delete_unit_from_memory(this.__children_unit[0]);
    }

    public remove_all_units_that_contain_itself_from_the_tree(): void 
    {
        this.__handler.remove_unit_from_parent(this.__container_to_remove);
        this.__handler.remove_unit_from_children(this.__container_to_remove);
    }

    public link_its_parent_node_to_its_children_node(): void 
    {
        this.__handler.link_parent_to_children(this.__container_to_remove);
    }

    public get_deleted_container_response(): Delete_Container_Response 
    {
        const c_id = this.__unit_to_remove?.container ? this.__unit_to_remove.container.id : "";
        const l_id = this.__unit_to_remove?.ligature ? this.__unit_to_remove.ligature.id : "";
        return new Delete_Container_Response([c_id, l_id]);
    }
}
