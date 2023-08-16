import { IDao_Container } from '../../../port/driven/dao/IDao_Container';
import { IDao_Ligature } from '../../../port/driven/dao/IDao_Ligature';
import { Container } from '../../entities/Container';
import { Ligature } from '../../entities/Ligature';
import { IMove_View_Positions, Ptr_Boolean } from '../../handlers/handlers_use_case/Move_View/Move_View_Handler';
import { IMove_View_Repository } from './../interfaces/IMove_View_Repository';
import { Ligature_Move_View_Positions } from './injectors/Move_View_Positions';
import { Container_Move_View_Positions } from './injectors/Move_View_Positions';

export class Move_View_Repository implements IMove_View_Repository
{
    private readonly __stop_move_view_cond : Ptr_Boolean = new Ptr_Boolean();

    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }

    public init_stop_move_view_condition(): Ptr_Boolean 
    {
        this.__stop_move_view_cond.value = false;
        
        return this.__stop_move_view_cond;
    }

    public set_stop_move_view_condition_to(value: boolean): void 
    {
        this.__stop_move_view_cond.value = value;
    }
    
    public get_all_move_views_positions(): IMove_View_Positions[] 
    {
        const containers : Container[] = this.__dao_container.get_all_containers_of_the_current_flow();
        const ligatures : Ligature[] = this.__dao_ligature.get_all_ligatures_of_the_current_flow();

        const result : IMove_View_Positions[] = [];

        containers.forEach(container => result.push(new Container_Move_View_Positions(container)));
        ligatures.forEach(ligature => result.push(new Ligature_Move_View_Positions(ligature)));

        return result;
    }
}

