import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector_ } from "../../../common/Vector/Vector_";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ICreate_Repository } from "../interfaces/IRepository";


export class Create_Repository implements ICreate_Repository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }

    get_default_container_rel_ratio(): Matrix<4> 
    {
        return this.__dao_container.get_default_rel_ratio();
    }

    save_root(container: Container) : void 
    {
        this.__dao_container.save_the_new_root(container);
    }

    save_unit(ligature: Ligature, container: Container) : void 
    {
        this.__dao_ligature.save_the_new_ligature(ligature);
        this.__dao_container.save_the_new_container(container);
    }
}