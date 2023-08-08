import { Matrix } from "../../../common/Matrix/Matrix";
import { Vector } from "../../../common/Vector/Vector";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Positions } from "../../use_cases/Zoom";
import { IZoomRepository } from "../interfaces/IZoomRepository";


export class ZoomRepository implements IZoomRepository
{
    private __zoom_level : number = 0;
    private __alpha : number = 1.1;

    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }

    public get_all_positions() : IZoom_Positions[] 
    {
        const containers : Container[] = this.__dao_container.get_all(); 
        const ligatures : Ligature[] = this.__dao_ligature.get_all();

        const result : IZoom_Positions[] = [];

        containers.forEach(container => result.push(new Container_Zoom_Position(container)));
        ligatures.forEach(ligature => result.push(new Ligature_Zoom_Position(ligature)));

        return result;
    }

    public get_zoom_factor() : number 
    {
        return this.__alpha ** this.__zoom_level;
    }

    public get_unzoom_factor() : number 
    {
        return this.__alpha ** (-this.__zoom_level);
    }

    public update_zoom_factor(direction: number): number 
    {
        if(direction !== -1 && direction !== 1) throw new Error("Directions must be either 1 or -1");

        this.__zoom_level += direction;
        return this.__alpha ** this.__zoom_level;
    }
}

class Ligature_Zoom_Position implements IZoom_Positions
{
    private readonly __abs_ratio : Matrix<3>;

    constructor(ligature : Ligature) 
    {
        this.__abs_ratio = ligature.positions.abs_ratio;   
    }

    public substract_abs_pos_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.substract_by_vector(delta);
    }

    public multiply_abs_pos_by_factor(factor: number): void 
    {
        this.__abs_ratio.__.multiply_by_factor(factor);
    }

    public add_abs_pos_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
    } 
}

class Container_Zoom_Position implements IZoom_Positions
{
    private readonly __abs_root : Vector;
    private readonly __abs_ratio : Matrix<4>;

    constructor(container : Container) 
    { 
        this.__abs_root = container.positions.abs_root;
        this.__abs_ratio = container.positions.abs_ratio;
    }

    public substract_abs_pos_by_delta(delta: Vector): void 
    {
        this.__abs_root.__.substract_by_vector(delta);
        this.__abs_ratio.__.substract_by_vector(delta);
    }

    public multiply_abs_pos_by_factor(factor: number): void 
    {
        this.__abs_root.__.multiply_by_factor(factor);
        this.__abs_ratio.__.multiply_by_factor(factor);
    }

    public add_abs_pos_by_delta(delta: Vector): void 
    {
        this.__abs_root.__.add_by_vector(delta);
        this.__abs_ratio.__.add_by_vector(delta);
    } 
}