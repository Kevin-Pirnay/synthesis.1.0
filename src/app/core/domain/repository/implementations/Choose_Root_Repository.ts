import { IZoom_Handeler } from './../../handlers/Zoom/IZoom_Handeler';
import { Container } from "../../entities/Container";
import { IChoose_Root_Repository } from "../interfaces/IChoose_Root_Repository";
import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector_ } from '../../../common/Vector/Vector_';
import { IZoom_On_Target_Handler } from "../../handlers/Zoom/IZoom_On_Target_Handler";
import { Zoom_On_Target_Handler } from '../../handlers/Zoom/Zoom_On_Target_Handler';
import { IMove_View_Handler } from '../../handlers/Move_View/IMove_View_Handler';
import { Data_Type, IDto } from '../../../port/driver/dto/IDto';
import { Root_Dto } from '../../entities/Root_Dto';
import { Dto } from '../../../port/driver/dto/Dto';
import { IChoose_Root_Container, IChoose_Root_Roots } from '../../use_cases/Choose_Root/Init_Choose_Root';
import { Vector } from '../../../common/Vector/Vector';
import { IIndexes } from '../../handlers/handlers_use_case/Indexes/IIndexes';
import { Indexes } from '../../handlers/handlers_use_case/Indexes/Indexes';


export class Choose_Root_Repository implements IChoose_Root_Repository
{
    private readonly __roots : string[] = [];
    private readonly __indexes : IIndexes = new Indexes();

    public init_indexes_of_roots_to_choose(nb_indexes : number): number 
    {
        return this.__indexes.init_indexes(nb_indexes);
    }

    public store_all_possible_roots(roots : string[]): void
    {
        this.__roots.length = 0;

        roots.forEach(root => this.__roots.push(root));
    }

    public get_choose_root_container(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IChoose_Root_Container
    {
        return new Choose_Root_Container(container, zoom_handler, move_view_handler);
    }

    public get_choose_root_roots(indexes : number[]): IChoose_Root_Roots 
    {
        return new Choose_Roots(this.__roots, indexes);
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }
}

//dont forget to remove root_dto from the view once it's ending
class Choose_Root_Container implements IChoose_Root_Container
{
    private readonly __zoom_on_target : IZoom_On_Target_Handler

    constructor(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler)
    {
        const abs_ratio = container.positions.abs_ratio;

        //*** change that *** */
        const middle_point_x = 1/2 * 500;
        const middle_point_y = 3/4 * 500;        
        
        const ratio_x = 1/5 * 500;
        const ratio_y = 0;
        //*** change that *** */
        const coordinates_and_ratio = new Matrix<2>([Vector_.new([middle_point_x,middle_point_y]), Vector_.new([ratio_x,ratio_y])]); //first middle_point - two ratio x and y

        this.__zoom_on_target = new Zoom_On_Target_Handler(abs_ratio, coordinates_and_ratio, zoom_handler, move_view_handler);
    }

    public zoom_and_place_itself_at_the_bottom(): void 
    {
        this.__zoom_on_target.move_by_a_distance_and_zoom_at_a_certain_ratio();
    }
}

class Choose_Roots implements IChoose_Root_Roots
{
    private readonly __roots : Root_Dto[] = [];
    private readonly __rotate_root : IRotate_Root_Dto;

    constructor(roots : string[], indexes : number[])
    {
        roots.forEach(root => this.__roots.push(new Root_Dto(root)));
        this.__rotate_root = new Rotate_Root_Dto(this.__roots, indexes);
    }

    public get_the_first_root_dto(): IDto 
    {
        return new Dto(this.__roots[0], Data_Type.ROOT_DTO);
    }

    public animate_first_root_to_choose(): void 
    {
        this.__rotate_root.rotate_roots(1);
    }

    public rotate(direction: number): void 
    {
        this.__rotate_root.rotate_roots(direction);
    }

    public get_dtos(indexes : number[]): IDto[] 
    {
        const result : IDto[] = [];

        indexes.forEach(index => result.push(new Dto(this.__roots[index], Data_Type.ROOT_DTO)));

        return result;
    }
}

interface IRotate_Root_Dto
{
    rotate_roots(direction : number): void;
}

class Rotate_Root_Dto implements IRotate_Root_Dto
{
    private readonly __current : IRotate_Root_Position | null = null;
    private readonly __next : IRotate_Root_Position | null = null;

    constructor(roots : Root_Dto[], indexes : number[]) 
    { 
        if(indexes[1] == undefined) throw new Error("Rotation must have a next index set at the index 1, to set current to null put -1 at the index 0");

        if(indexes[0] >= 0) this.__current = new Rotate_Root_Position(roots[indexes[0]]);
        this.__next = new Rotate_Root_Position(roots[indexes[1]]);
    }

    public async rotate_roots(direction : number) : Promise<void>
    {
        const axe_rotation = Vector_.new([(250 * direction),0,0]);
        const center_rotation = Vector_.new([1/2 * 500, 500]);

        if(this.__current) this.__current.init_position_for_rotation(axe_rotation);
        if(this.__next) this.__next.init_position_for_rotation(axe_rotation);

        //put that in class and use callback???
        let angle = 0;
        const rate = 0.8
        while(1)
        {
            const radian = angle * Math.PI/180 * direction;
            const dephasage = radian + (Math.PI / 2 * direction);
            
            if(this.__current) this.__current.rotate_position_on_a_certain_point(dephasage, center_rotation);
            if(this.__next) this.__next.rotate_position_on_a_certain_point(radian, center_rotation);

            await new Promise(r => setTimeout(r, 1)); 

            angle += (1 * rate);
            if(Math.abs(angle) >= 90) break;
        }
    }
}

interface IRotate_Root_Position
{
    init_position_for_rotation(vec : Vector) : void;
    rotate_position_on_a_certain_point(radian : number, position : Vector) : void;
}

class Rotate_Root_Position implements IRotate_Root_Position
{
    private readonly __abs_ratio : Matrix<4>;
    private readonly __copy : Matrix<4>

    constructor(root_dto : Root_Dto) 
    {
        this.__abs_ratio = root_dto.positions.abs_ratio;
        this.__copy = this.__abs_ratio.__.copy();
    }

    public init_position_for_rotation(vec_pos: Vector): void 
    {
        this.__copy.__.add_by_vector(vec_pos);
        this.__abs_ratio.__.add_by_vector(vec_pos);
    }

    public rotate_position_on_a_certain_point(radian : number, position : Vector): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__copy.__.rotate_z_new(radian).__.add_by_vector(position));
    }
}
