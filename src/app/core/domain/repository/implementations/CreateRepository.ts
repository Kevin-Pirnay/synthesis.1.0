import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector_ } from "../../../common/Vector/Vector_";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { ICreateRepository } from "../interfaces/ICreateRepository";

export class CreateRepository implements ICreateRepository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }

    get_default_container_ratio(): Matrix<4> 
    {
        return  new Matrix([
                    Vector_.zero(),
                    Vector_.new([30,0]),
                    Vector_.new([30,30]),
                    Vector_.new([0,30])
            ]);
    }

    save_root(container: Container) : void 
    {
        this.__dao_container.save_new_root(container);
    }

    save_unit(ligature: Ligature, container: Container) : void 
    {
        this.__dao_ligature.save(ligature);
        this.__dao_container.save_new_container(container);
    }
}