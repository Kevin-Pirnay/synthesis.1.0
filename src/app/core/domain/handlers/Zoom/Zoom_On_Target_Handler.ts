import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { IMove_View_Handler } from "../Move_View/IMove_View_Handler";
import { IZoom_Handeler } from "./IZoom_Handeler";
import { IZoom_On_Target_Handler } from "./IZoom_On_Target_Handler";


export class Zoom_On_Target_Handler implements IZoom_On_Target_Handler 
{
    private readonly __distance: ICompute_Distance;
    private readonly __zoom_factor: ICompute_Zoom_Factor;
    private readonly __move_by_dist: IMove_By_Dist;
    private readonly __zoom_by_fact: IZoom_By_Fact;

    constructor(
        abs_ratio: Matrix<4>,
        coordinates_and_ratio: Matrix<2>,
        zoom_handler: IZoom_Handeler,
        move_view_handler: IMove_View_Handler
    ) {
        this.__distance = new Compute_Distance(abs_ratio, coordinates_and_ratio);
        this.__zoom_factor = new Compute_Zoom_Factor(abs_ratio, coordinates_and_ratio);
        this.__move_by_dist = new Move_By_Dist(move_view_handler);
        this.__zoom_by_fact = new Zoom_By_Fact(zoom_handler);
    }

    public move_by_a_distance_and_zoom_at_a_certain_ratio(): void //change by adding gradually
    {
        const zoom_factor_data: number = this.__zoom_factor.compute_a_zoom_factor();
        this.__zoom_by_fact.zoom(zoom_factor_data);

        const distance_data: Vector = this.__distance.compute_a_distance();
        this.__move_by_dist.move(distance_data);
    }
}

export interface IZoom_By_Fact 
{
    zoom(zoom_factor: number): void;
}

export class Zoom_By_Fact implements IZoom_By_Fact 
{
    constructor(private readonly __zoom_handler: IZoom_Handeler) { }

    public zoom(zoom_factor: number): void 
    {
        this.__zoom_handler.zoom_by_factor(zoom_factor);
    }
}

export interface IMove_By_Dist 
{
    move(distance: Vector): void;
}

export class Move_By_Dist implements IMove_By_Dist 
{
    constructor(private readonly __move_view_handler: IMove_View_Handler) { }

    public move(distance: Vector): void 
    {
        this.__move_view_handler.move_view_by_delta(distance);
    }
}

export interface ICompute_Zoom_Factor 
{
    compute_a_zoom_factor(): number;
}

export class Compute_Zoom_Factor implements ICompute_Zoom_Factor 
{
    constructor(private readonly __abs_ratio: Matrix<4>, private readonly __coordinates_and_ratio: Matrix<2>) { }

    public compute_a_zoom_factor(): number 
    {
        const x_container = this.__abs_ratio._[1]._[0] - this.__abs_ratio._[0]._[0];

        const x_target = this.__coordinates_and_ratio._[1]._[0];

        return x_target / x_container;
    }
}

export interface ICompute_Distance 
{
    compute_a_distance(): Vector;
}

export class Compute_Distance implements ICompute_Distance 
{
    private readonly __middle_point: IMiddle_Point;

    constructor(private readonly __abs_ratio: Matrix<4>, private readonly __coordinates_and_ratio: Matrix<2>) 
    {
        this.__middle_point = new Middle_Point();
    }

    public compute_a_distance(): Vector 
    {
        const middle_container: Vector = this.__middle_point.get_the_middle_point(this.__abs_ratio);
        const middle_target_pos: Vector = this.__coordinates_and_ratio._[0];

        return this.__compute(middle_target_pos, middle_container);
    }

    private __compute(a: Vector, b: Vector): Vector //first dist - second slope
    {
        const x = Math.sqrt((a._[0] - b._[0]) ** 2) * ((a._[0] - b._[0]) / Math.abs(a._[0] - b._[0]));
        const y = Math.sqrt((a._[1] - b._[1]) ** 2) * ((a._[1] - b._[1]) / Math.abs(a._[1] - b._[1]));

        return Vector_.new([x, y]);
    }
}

export interface IMiddle_Point 
{
    get_the_middle_point(matrix: Matrix<4>): Vector;
}

export class Middle_Point implements IMiddle_Point 
{
    public get_the_middle_point(matrix: Matrix<4>): Vector 
    {
        const x = (matrix._[0]._[0] + matrix._[1]._[0]) * 1 / 2;
        const y = (matrix._[0]._[1] + matrix._[3]._[1]) * 1 / 2;

        return Vector_.new([x, y]);
    }
}

