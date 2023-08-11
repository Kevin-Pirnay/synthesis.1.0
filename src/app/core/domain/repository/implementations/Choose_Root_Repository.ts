import { IZoom_Handeler } from './../../handlers/Zoom/IZoom_Handeler';
import { Container } from "../../entities/Container";
import { IChoose_Root_Container } from "../../use_cases/Choose_Root";
import { IChoose_Root_Repository } from "../interfaces/IChoose_Root_Repository";
import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector_ } from '../../../common/Vector/Vector_';
import { IZoom_On_Target_Handler } from "../../handlers/Zoom/IZoom_On_Target_Handler";
import { Zoom_On_Target_Handler } from '../../handlers/Zoom/Zoom_On_Target_Handler';
import { IMove_View_Handler } from '../../handlers/Move_View/IMove_View_Handler';
import { Data_Type, IDto } from '../../../port/driver/dto/IDto';
import { Root_Dto } from '../../entities/Root_Dto';
import { Dto } from '../../../port/driver/dto/Dto';
import { Vector } from '../../../common/Vector/Vector';


export class Choose_Root_Repository implements IChoose_Root_Repository
{
    public get_choose_root_container(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IChoose_Root_Container
    {
        return new Choose_Root_Container(container, zoom_handler, move_view_handler);
    }
}

//dont forget to remove root_dto from the view once it's ending
class Choose_Root_Container implements IChoose_Root_Container
{
    private readonly __zoom_container : IZoom_Container;
    private readonly __animate_root : IAnimate_Root;

    constructor(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler)
    {
        this.__zoom_container = new Zoom_Container(container, zoom_handler, move_view_handler);
        this.__animate_root = new Animate_Root(); 
    }

    public zoom_and_place_itself_at_the_bottom(): void 
    {
        this.__zoom_container.zoom_on_itself_to_be_place_at_the_bottom();
    }

    public animate_root_to_choose(): IDto 
    {
        return this.__animate_root.animate_the_first_root_to_choose();
    }
    
    public show_next_root_to_choose(): void 
    {
        throw new Error('Method not implemented.');
    }
}

interface IZoom_Container
{
    zoom_on_itself_to_be_place_at_the_bottom(): void;
}

interface IAnimate_Root
{
    animate_the_first_root_to_choose(): IDto;
}

class Zoom_Container implements IZoom_Container
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

    public zoom_on_itself_to_be_place_at_the_bottom(): void 
    {
        this.__zoom_on_target.move_by_a_distance_and_zoom_at_a_certain_ratio();
    }
}

/**
 * step1: create dto at position
 * step2: send dto
 * step3: animate dto by rotate on fix x and variable y
 */

class Animate_Root implements IAnimate_Root
{
    private readonly __create_root_dto : ICreate_Root_Dto;
    private readonly __rotate_root : IRotate_Root_Dto;

    constructor()
    {
        this.__create_root_dto = new Create_Root_Dto();
        this.__rotate_root = new Rotate_Root_Dto();
    }

    public animate_the_first_root_to_choose(): IDto 
    {
        const root_dto : Root_Dto = this.__create_root_dto.create_root_container();
        
        this.__rotate_root.rotate(root_dto);

        return this.__create_root_dto.get_dto(root_dto);
    }
}

interface ICreate_Root_Dto
{
    create_root_container(): Root_Dto;
    get_dto(root : Root_Dto) : IDto;
}

interface IRotate_Root_Dto
{
    rotate(root_dto : Root_Dto): void;
}

class Create_Root_Dto implements ICreate_Root_Dto
{
    public get_dto(root: Root_Dto): IDto 
    {
        return new Dto(root, Data_Type.ROOT_DTO)
    }

    public create_root_container(): Root_Dto 
    {
        return new Root_Dto();
    }
}

class Rotate_Root_Dto implements IRotate_Root_Dto
{
    public async rotate(root_dto : Root_Dto) : Promise<void>
    {
        root_dto.positions.abs_ratio.__.add_by_vector(Vector_.new([200,0,100]));
        const copy = root_dto.positions.abs_ratio.__.copy();

        let angle = 0;
        while(1)
        {
            const radian = angle * Math.PI/180 + Math.PI/2;

            root_dto.positions.abs_ratio.__.assign_new_data(copy.__.rotate_z_new(radian).__.rotate_y(radian).__.add_by_vector(Vector_.new([200,200])));

            await new Promise(r => setTimeout(r, 1)); 

            angle +=1;
            if(Math.abs(angle) >= 360) angle = 0;
        }
    }
}

