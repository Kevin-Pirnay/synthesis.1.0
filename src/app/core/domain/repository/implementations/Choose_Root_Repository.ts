
import { IIndexes } from '../../handlers/handlers_use_case/Indexes/IIndexes';
import { Indexes } from '../../handlers/handlers_use_case/Indexes/Indexes';
import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector_ } from '../../../common/Vector/Vector_';
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
import { IZoom_On_Target, Zoom_On_Target } from '../../handlers/handlers_use_case/On_Target/Zoom_On_Target';


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

        if (container.back_root)  this.__roots.push(container.back_root);
    }

    public get_choose_root_container(container : Container, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler): IChoose_Roots_Container
    {
        const coordinates : Vector<3> = this.__dao_anim.get_coordinates_choose_roots_anim();

        const ratio : number = this.__dao_anim.get_ratio_choose_roots_anim();

        const zoom_center_point : Vector<3> = this.__dao_anim.get_zoom_center_point_choose_roots_anim();
       
        return new Choose_Roots_Container(container, zoom_handler, move_view_handler, coordinates, ratio, zoom_center_point);
    }

    public get_choose_root_roots(indexes : number[]): IChoose_Roots_Root 
    {
        const axe_rotation : Vector<3> = this.__dao_anim.get_axe_rotation_choose_roots_anim();

        const center_rotation : Vector<3> = this.__dao_anim.get_center_rotation_choose_roots_anim();

        const rate : number = this.__dao_anim.get_rate_choose_roots_anim();
    
        return new Choose_Roots_Root(this.__roots, indexes, axe_rotation, center_rotation, rate);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }

    public get_chosen_root(chosen_root: Root_Choice, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler): IChoosen_Root
    {
        return new Chosen_Root(chosen_root, zoom_handler, move_view_handler);
    }
}

class Chosen_Root implements IChoosen_Root
{
    private readonly __abs_ratio: Matrix<4>;

    constructor(chosen_root: Root_Choice, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler) 
    { 
        this.__abs_ratio = chosen_root.positions.abs_ratio;
    }

    public async anim(): Promise<void> 
    {
        const pos = this.__abs_ratio
        let count = 0;
        while(1)
        {
            if(count >= 600) break;

            pos._[0]._[0]--
            pos._[0]._[1]--

            pos._[1]._[0]++
            pos._[1]._[1]--
            
            pos._[2]._[0]++
            pos._[2]._[1]++

            pos._[3]._[0]--
            pos._[3]._[1]++

            await new Promise(r=> setTimeout(r,1));

            count++;            
        }
    }

    private __get_center_root(root : Root_Choice) : Vector<3>
    {
        // const positions : Matrix<4> = root.positions.abs_ratio;

        // const x = (positions._[0]._[0] + positions._[1]._[0]) * 1/2;
        // const y = (positions._[0]._[1] + positions._[1]._[1]) * 1/2;

        return Vector_.new([window.innerWidth/4,window.innerHeight/4,0]);
    }

}


