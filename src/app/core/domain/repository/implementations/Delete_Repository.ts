import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Unit_Node, Container } from "../../entities/Container";
import { INode_Linker } from "../../handlers/Link_Node/INode_Linker";
import { IDelete_Container_Repository } from "../interfaces/IDelete_Repository";


export class Delete_Container_Repository implements IDelete_Container_Repository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature,
    ) { }
    
    public delete_unit(unit_to_remove: Unit_Node): void 
    {
        this.__dao_container.delete(unit_to_remove.container);
        this.__dao_ligature.delete(unit_to_remove.ligature);
    }    
}