
import { IIndexes } from '../../handlers/handlers_use_case/Indexes/IIndexes';
import { Indexes } from '../../handlers/handlers_use_case/Indexes/Indexes';
import { Container } from '../../entities/Container';
import { IMove_View_Handler } from '../../handlers/handlers_use_case/Move_View/IMove_View_Handler';
import { IChoose_Root_Repository } from '../interfaces/IRepository';
import { IZoom_Handler } from '../../handlers/handlers_use_case/Zoom/IZoom_Handler';
import { IChoose_Roots_Container, IChoose_Roots_Root } from '../../use_cases/Choose_Root/Init_Choose_Root';
import { Choose_Roots_Container } from './injectors/Choose_Root';
import { Choose_Roots_Root } from './injectors/Choose_Root';
import { Vector } from '../../../common/Vector/Vector';
import { IDao_Anim } from '../../../port/driven/dao/IDao_Anim';
import { Root_Choice } from '../../entities/Root_Choice';
import { IChoosen_Root } from '../../use_cases/Choose_Root/Chosen_Root';
import { Quad_Callback } from '../../../../adapters/driven/dao/Dao_Anim';
import { Chosen_Root } from './injectors/Chosen_Root';
import { Matrix } from '../../../common/Matrix/Matrix';


export class Choose_Root_Repository implements IChoose_Root_Repository
{
    private readonly __roots : string[] = [];
    private readonly __indexes : IIndexes = new Indexes();

    constructor(private readonly __dao_anim : IDao_Anim) { }

    public init_indexes_of_roots_to_choose(): number 
    {
        return this.__indexes.init_indexes(this.__roots.length);
    }

    public store_all_possible_roots(container : Container): void
    {
        this.__roots.length = 0;

        container.roots.forEach(root => this.__roots.push(root));

        if (container.back_roots.length)  container.back_roots.forEach(root => this.__roots.push(root));
    }

    public get_choose_root_container_injector(container : Container, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler): IChoose_Roots_Container
    {
        const coordinates : Vector<3> = this.__dao_anim.get_coordinates_choose_roots_anim();

        const ratio : number = this.__dao_anim.get_ratio_choose_roots_anim();

        const zoom_center_point : Vector<3> = this.__dao_anim.get_zoom_center_point_choose_roots_anim();

        const move_quad : Quad_Callback = this.__dao_anim.get_move_quad_choose_roots_anim();

        const zoom_quad : Quad_Callback = this.__dao_anim.get_zoom_quad_choose_roots_anim();
       
        return new Choose_Roots_Container(container, zoom_handler, move_view_handler, coordinates, ratio, zoom_center_point, move_quad, zoom_quad);
    }

    public get_choose_roots_root_injector(indexes : number[]): IChoose_Roots_Root 
    {
        const axe_rotation : Vector<3> = this.__dao_anim.get_axe_rotation_choose_roots_anim();

        const center_rotation : Vector<3> = this.__dao_anim.get_center_rotation_choose_roots_anim();

        const rate : number = this.__dao_anim.get_rate_choose_roots_anim();

        const choose_root_abs_ratio : Matrix<4> = this.__dao_anim.get_abs_ratio_choose_root();
    
        return new Choose_Roots_Root(this.__roots, indexes, axe_rotation, center_rotation, rate, choose_root_abs_ratio);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }

    public get_chosen_root_injector(chosen_root: Root_Choice): IChoosen_Root
    {
        return new Chosen_Root(chosen_root);
    }
}


