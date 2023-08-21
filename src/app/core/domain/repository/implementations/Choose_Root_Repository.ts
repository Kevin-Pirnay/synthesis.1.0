
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


export class Choose_Root_Repository implements IChoose_Root_Repository
{
    private readonly __roots : string[] = [];
    private readonly __indexes : IIndexes = new Indexes();

    public init_indexes_of_roots_to_choose(nb_indexes : number): number 
    {
        return this.__indexes.init_indexes(nb_indexes);
    }

    public store_all_possible_roots(container : Container): void
    {
        this.__roots.length = 0;

        container.roots.forEach(root => this.__roots.push(root));

        if (container.back_root)  this.__roots.push(container.back_root);
    }

    public get_choose_root_container(container : Container, zoom_handler : IZoom_Handler, move_view_handler : IMove_View_Handler): IChoose_Roots_Container
    {
        const middle_point_x = 1/2 * 500;
        const middle_point_y = 1/2 * 500;        
        
        const ratio_x = 1/5 * 500;
        const coordinates = new Vector<2>([middle_point_x,middle_point_y, 0]); //first middle_point - two ratio x and y
        //change that
        return new Choose_Roots_Container(container, zoom_handler, move_view_handler, coordinates, ratio_x);
    }

    public get_choose_root_roots(indexes : number[]): IChoose_Roots_Root 
    {
        return new Choose_Roots_Root(this.__roots, indexes);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }
}


