import { IZoom_Handeler } from './../../handlers/Zoom/IZoom_Handeler';
import { Container } from "../../entities/Container";
import { IChoose_Root_Container } from "../../use_cases/Choose_Root";
import { IChoose_Root_Repository } from "../interfaces/IChoose_Root_Repository";
import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector_ } from '../../../common/Vector/Vector_';

export class Choose_Root_Repository implements IChoose_Root_Repository
{
    public get_choose_root_container(container : Container): IChoose_Root_Container 
    {
        return new Choose_Root_Container(container);
    }
}

class Choose_Root_Container implements IChoose_Root_Container
{
    private readonly __zoom_container : IZoom_Container;
    private readonly __animate_root : IAnimate_Root;

    constructor(container : Container)
    {
        this.__zoom_container = new Zoom_Container(container);
        this.__animate_root = new Animate_Root(); 
    }

    public zoom_and_place_itself_at_the_bottom(zoom_handler : IZoom_Handeler): void 
    {
        this.__zoom_container.zoom_on_itself_to_be_place_at_the_bottom(zoom_handler);
    }

    public animate_root_to_chhose(): void 
    {
        this.__animate_root.animate_the_first_root_to_choose();
    } 
}

interface IZoom_Container
{
    zoom_on_itself_to_be_place_at_the_bottom(zoom_handler : IZoom_Handeler): void;
}

interface IAnimate_Root
{
    animate_the_first_root_to_choose(): void;
}

class Zoom_Container implements IZoom_Container
{
    private readonly __abs_ratio : Matrix<4>;
    private readonly __coordinates_and_ratio : Matrix<2>; //first middle_point - two ratio x and y

    constructor(container : Container)
    {
        this.__abs_ratio = container.positions.abs_ratio;

        const middle_point_x = 1/2 * window.innerWidth;
        const middle_point_y = 3/4 * window.innerHeight;
        const ratio_x = 1/5 * window.innerWidth;
        const ratio_y = 0;
        this.__coordinates_and_ratio = new Matrix<2>([Vector_.new([middle_point_x,middle_point_y]), Vector_.new([ratio_x,ratio_y])]);
    }

    public zoom_on_itself_to_be_place_at_the_bottom(zoom_handler : IZoom_Handeler): void 
    {
        zoom_handler.zoom_on_target_at_a_certain_ratio(this.__abs_ratio, this.__coordinates_and_ratio);
    }
}

class Animate_Root implements IAnimate_Root
{
    animate_the_first_root_to_choose(): void 
    {
        throw new Error('Method not implemented.');
    }
}