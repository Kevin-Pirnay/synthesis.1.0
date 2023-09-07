import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Unit_Node, Container } from "../../entities/Container";
import { INode_Linker } from "../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IDelete_Container_Repository } from "../interfaces/IRepository";
import { Remove_Container } from "./injectors/Remove_Container";


export class Delete_Container_Repository implements IDelete_Container_Repository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature,
    ) { }

    public get_remove_container_injector(container_to_remove: Container, node_linker_handler: INode_Linker) : Remove_Container
    {
        return new Remove_Container(container_to_remove, node_linker_handler, this);
    }
    
    public delete_unit_from_memory(unit_to_remove: Unit_Node): void 
    {
        if ( unit_to_remove.container ) this.__dao_container.delete_container(unit_to_remove.container);
        if ( unit_to_remove.ligature ) this.__dao_ligature.delete_ligature(unit_to_remove.ligature);
    }    
}

