import { IZoom_Handeler } from './../../handlers/Zoom/IZoom_Handeler';
import { Container } from "../../entities/Container";
import { IChoose_Root_Container } from "../../use_cases/Choose_Root";
import { IChoose_Root_Repository } from "../interfaces/IChoose_Root_Repository";
import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector_ } from '../../../common/Vector/Vector_';
import { IZoom_On_Target_Handler } from "../../handlers/Zoom/IZoom_On_Target_Handler";
import { Zoom_On_Target_Handler } from '../../handlers/Zoom/Zoom_On_Target_Handler';
import { IMove_View_Handler } from '../../handlers/Move_View/IMove_View_Handler';

export class Choose_Root_Repository implements IChoose_Root_Repository
{
    public get_choose_root_container(container : Container, zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler): IChoose_Root_Container
    {
        return new Choose_Root_Container(container, zoom_handler, move_view_handler);
    }
}

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

    public animate_root_to_chhose(): void 
    {
        this.__animate_root.animate_the_first_root_to_choose();
    } 
}

interface IZoom_Container
{
    zoom_on_itself_to_be_place_at_the_bottom(): void;
}

interface IAnimate_Root
{
    animate_the_first_root_to_choose(): void;
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

class Animate_Root implements IAnimate_Root
{
    public animate_the_first_root_to_choose(): void 
    {
        throw new Error('Method not implemented.');
    }
}