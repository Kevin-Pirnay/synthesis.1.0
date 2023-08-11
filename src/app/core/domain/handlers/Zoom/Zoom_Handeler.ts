import { Matrix } from './../../../common/Matrix/Matrix';
import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoomRepository } from "../../repository/interfaces/IZoomRepository";
import { IZoom_Positions } from "../../use_cases/Zoom";
import { IZoom_Handeler } from "./IZoom_Handeler";
import { IMove_View_Handler } from '../Move_View/IMove_View_Handler';

export class Zoom_Handeler implements IZoom_Handeler
{
    constructor(private readonly __zoom_repository : IZoomRepository) { }

    public update_container_with_current_zoom(container: Container): void 
    {
        const zoom_factor : number = this.__zoom_repository.get_zoom_factor();

        const abs_ratio = container.positions.rel_ratio.__.multiply_by_factor_new(zoom_factor).__.add_by_vector_new(container.positions.abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);
    }

    public update_unit_with_current_zoom(ligature : Ligature, container: Container): void 
    {
        this.update_container_with_current_zoom(container);

        ligature.__.update_ratio();
    }
    
    public zoom(positions : IZoom_Positions[], factor : number) : void
    {
        const center : Vector = Vector_.new([window.innerWidth / 2, window.innerHeight / 2]);

        positions.forEach((position : IZoom_Positions) =>
        {
            //move center to origin
            position.substract_abs_pos_by_delta(center);

            //multiply factor
            position.multiply_abs_pos_by_factor(factor);

            //move back to center 
            position.add_abs_pos_by_delta(center);
        });
    }
}

export interface IZoom_On_Target_Handler
{
    compute_the_distance_and_the_factor_zoom() : IDistance_And_Factor;
    move_by_a_distance_and_zoom_at_a_certain_ratio(distance: Vector, zoom_factor: number) : void;
}

interface IDistance_And_Factor
{
    distance : Vector; //x = dist and y = slope
    zoom_factor : number;
}

export class Zoom_On_Target_Handler implements IZoom_On_Target_Handler
{
    private readonly __distance : ICompute_Distance;
    private readonly __zoom_factor : ICompute_Zoom_Factor;
    private readonly __move_by_dist : IMove_By_Dist;
    private readonly __zoom_by_fact : IZoom_By_Fact;

    constructor(
        abs_ratio: Matrix<4>, 
        coordinates_and_ratio: Matrix<2>,
        zoom_handler : IZoom_Handeler, 
        move_view_handler : IMove_View_Handler
    ) {
        this.__distance = new Compute_Distance(abs_ratio, coordinates_and_ratio);
        this.__zoom_factor = new Compute_Zoom_Factor(abs_ratio, coordinates_and_ratio);
        this.__move_by_dist = new Move_By_Dist(move_view_handler);
        this.__zoom_by_fact = new Zoom_By_Fact(zoom_handler);
    }

    public compute_the_distance_and_the_factor_zoom(): IDistance_And_Factor 
    {
        const distance_data : Vector = this.__distance.compute_a_distance();
        const zoom_factor : number = this.__zoom_factor.compute_a_zoom_factor();

        return {  distance : distance_data, zoom_factor : zoom_factor };
    }

    public move_by_a_distance_and_zoom_at_a_certain_ratio(distance: Vector, zoom_factor: number): void 
    {
        this.__move_by_dist.move(distance);
        this.__zoom_by_fact.zoom(zoom_factor);
    }
}

interface IZoom_By_Fact
{
    zoom(zoom_factor: number): void;
}

class Zoom_By_Fact implements IZoom_By_Fact
{
    public zoom(zoom_factor: number) : void
    {
        throw new Error('Method not implemented.');
    }

    constructor(zoom_handler : IZoom_Handeler) 
    {

    }
}

interface IMove_By_Dist
{
    move(distance: Vector): void;

}

class Move_By_Dist implements IMove_By_Dist
{
    constructor(move_view_handler : IMove_View_Handler)
    {

    }

    public move(distance: Vector): void 
    {
        throw new Error('Method not implemented.');
    }
}

interface ICompute_Zoom_Factor
{
    compute_a_zoom_factor() : number;
}

class Compute_Zoom_Factor implements ICompute_Zoom_Factor
{
    constructor(private readonly __abs_ratio: Matrix<4>, private readonly __coordinates_and_ratio: Matrix<2>) { }
    
    public compute_a_zoom_factor(): number 
    {
        const x_container = this.__abs_ratio._[1]._[0] - this.__abs_ratio._[0]._[0];
        const x_target = this.__coordinates_and_ratio._[1]._[0];

        return x_target / x_container;
    }
}

interface ICompute_Distance
{
    compute_a_distance() : Vector;
}

class Compute_Distance implements ICompute_Distance
{
    private readonly __middle_point : IMiddle_Point;

    constructor(private readonly __abs_ratio: Matrix<4>, private readonly __coordinates_and_ratio: Matrix<2>)
    {
        this.__middle_point = new Middle_Point();
    }

    public compute_a_distance(): Vector 
    {
        const middle_container : Vector = this.__middle_point.get_the_middle_point(this.__abs_ratio);
        const middle_target_pos : Vector = this.__coordinates_and_ratio._[0];

        return this.__compute(middle_target_pos, middle_container);
    }

    private __compute(a : Vector, b : Vector) : Vector //first dist - second slope
    {
        const xsqr = ( a._[0] - b._[0] ) ** 2;
        const ysqr = ( a._[1] - b._[1] ) ** 2;

        const distance = Math.sqrt( xsqr + ysqr );

        const slope = Math.abs(a._[1] - b._[1]) / Math.abs(a._[0] - b._[0]);

        return Vector_.new([distance, slope]);
    }
}

interface IMiddle_Point
{
    get_the_middle_point(matrix : Matrix<4>) : Vector;
}

class Middle_Point implements IMiddle_Point
{
    public get_the_middle_point(matrix: Matrix<4>): Vector 
    {
        const x = ( matrix._[0]._[0] + matrix._[1]._[0] ) * 1/2;
        const y = ( matrix._[0]._[1] + matrix._[3]._[1] ) * 1/2;

        return Vector_.new([x,y]);
    }
}