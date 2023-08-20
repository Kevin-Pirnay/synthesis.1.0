import { Dto } from './../../../../port/driver/dto/Dto';
import { Root_Choice } from './../../../entities/Root_Choice';
import { Matrix } from "../../../../common/Matrix/Matrix";
import { Vector } from "../../../../common/Vector/Vector";
import { Vector_ } from "../../../../common/Vector/Vector_";
import { IDto, Data_Type } from "../../../../port/driver/dto/IDto";
import { Container } from "../../../entities/Container";
import { IMove_View_Handler } from "../../../handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { IZoom_Handler } from "../../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { IChoose_Roots_Container, IChoose_Roots_Root } from "../../../use_cases/Choose_Root/Init_Choose_Root";
import { IZoom_On_Target, Zoom_On_Target } from '../../../handlers/handlers_use_case/On_Target/Zoom_On_Target';


//dont forget to remove root_dto from the view once it's ending
export class Choose_Roots_Container implements IChoose_Roots_Container 
{
    private readonly __zoom_on_target: IZoom_On_Target;

    constructor(container: Container, zoom_handler: IZoom_Handler, move_view_handler: IMove_View_Handler, coordinates_and_ratio: Matrix<2>) 
    {
        const abs_ratio = container.positions.abs_ratio;

        const coordinates : Vector<3> = coordinates_and_ratio._[0];

        const ratio : number = coordinates_and_ratio._[1]._[0];

        this.__zoom_on_target = new Zoom_On_Target(abs_ratio, coordinates, ratio, zoom_handler, move_view_handler);
    }

    public zoom_and_place_itself_at_the_bottom(): void 
    {
        this.__zoom_on_target.move_and_zoom();
    }
}


export class Choose_Roots_Root implements IChoose_Roots_Root 
{
    private readonly __roots: Root_Choice[] = [];
    private readonly __rotate_root: IRotate_Roots_Root;

    constructor(roots: string[], indexes: number[]) 
    {
        roots.forEach(root => this.__roots.push(new Root_Choice(root)));

        this.__rotate_root = new Rotate_Roots_Root(this.__roots, indexes);
    }

    public get_the_first_root_dto(): IDto 
    {
        return new Dto(this.__roots[0], Data_Type.ROOT_CHOICE);
    }

    public animate_first_root_to_choose(): void 
    {
        const direction: number = 1;

        this.__rotate_root.rotate_roots(direction);
    }

    public rotate(direction: number): void 
    {
        this.__rotate_root.rotate_roots(direction);
    }

    public get_dtos(indexes: number[]): IDto[] 
    {
        const result: IDto[] = [];

        indexes.forEach(index => result.push(new Dto(this.__roots[index], Data_Type.ROOT_CHOICE)));

        return result;
    }
}


export interface IRotate_Roots_Root 
{
    rotate_roots(direction: number): void;
}


export class Rotate_Roots_Root implements IRotate_Roots_Root 
{
    private readonly __current: IRotate_Roots_Root_Position | null = null;
    private readonly __next: IRotate_Roots_Root_Position | null = null;

    constructor(roots: Root_Choice[], indexes: number[]) 
    {
        if (indexes[1] == undefined) throw new Error("Rotation must have a next index set at the index 1, to set current to null put -1 at the index 0");

        if (indexes[0] >= 0) this.__current = new Rotate_Roots_Position(roots[indexes[0]]);
        
        this.__next = new Rotate_Roots_Position(roots[indexes[1]]);
    }

    public async rotate_roots(direction: number): Promise<void> 
    {
        const axe_rotation = Vector_.new([(250 * direction), 0, 0]);
        const center_rotation = Vector_.new([1 / 2 * 500, 500]);

        if (this.__current) this.__current.init_position_for_rotation(axe_rotation);
        if (this.__next) this.__next.init_position_for_rotation(axe_rotation);

        //put that in class and use callback???
        let angle = 0;
        const rate = 0.8;
        while (1) {
            const radian = angle * Math.PI / 180 * direction;
            const dephasage = radian + (Math.PI / 2 * direction);

            if (this.__current) this.__current.rotate_position_on_a_certain_point(dephasage, center_rotation);
            if (this.__next) this.__next.rotate_position_on_a_certain_point(radian, center_rotation);

            await new Promise(r => setTimeout(r, 1));

            angle += (1 * rate);
            if (Math.abs(angle) >= 90) break;
        }
    }
}


export interface IRotate_Roots_Root_Position 
{
    init_position_for_rotation(vec: Vector<3>): void;
    rotate_position_on_a_certain_point(radian: number, position: Vector<3>): void;
}


export class Rotate_Roots_Position implements IRotate_Roots_Root_Position 
{
    private readonly __abs_ratio: Matrix<4>;
    private readonly __copy: Matrix<4>;

    constructor(root_dto: Root_Choice) 
    {
        this.__abs_ratio = root_dto.positions.abs_ratio;
        this.__copy = this.__abs_ratio.__.copy();
    }

    public init_position_for_rotation(vec_pos: Vector<3>): void 
    {
        this.__copy.__.add_by_vector(vec_pos);
        this.__abs_ratio.__.add_by_vector(vec_pos);
    }

    public rotate_position_on_a_certain_point(radian: number, position: Vector<3>): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__copy.__.rotate_z_new(radian).__.add_by_vector(position));
    }
}

