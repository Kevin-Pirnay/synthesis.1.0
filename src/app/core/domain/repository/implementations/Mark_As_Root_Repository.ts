import { Vector } from "../../../common/Vector/Vector";
import { Container } from "../../entities/Container";
import { IMark_As_Root } from "../../use_cases/Mark_As_Root";
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';
import { IMark_As_Root_Repository } from '../interfaces/IRepository';
import { Mark_As_Root } from './injectors/Mark_As_Root';

export class Mark_As_Root_Repository implements IMark_As_Root_Repository
{
    constructor(private readonly __container_dao : IDao_Container) { }

    public save_the_new_root(container: Container) : void 
    {
        this.__container_dao.save_the_new_root(container);
    }

    public get_default_position_of_the_root(): Vector<3> 
    {
        return this.__container_dao.get_default_position_of_the_root();
    }

    public get_mark_as_root_data(container: Container): IMark_As_Root 
    {
        return new Mark_As_Root(container);
    }
}

