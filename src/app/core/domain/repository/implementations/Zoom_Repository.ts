import { IDao_Anim } from './../../../port/driven/dao/IDao_Anim';
import { Vector } from "../../../common/Vector/Vector";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Repository } from "../interfaces/IRepository";
import { Container_Zoom_Positions } from "./injectors/Zoom_Positions";
import { Ligature_Zoom_Positions } from "./injectors/Zoom_Positions";
import { IZoom_Positions } from '../../handlers/handlers_use_case/Zoom/IZoom_Positions';
import { Ptr } from '../../../common/Ptr';


export class Zoom_Repository implements IZoom_Repository
{
    private __zoom_level : number = 0;
    private __alpha : number = 1.01;
    private readonly __stop_zoom_condition : Ptr<boolean> = new Ptr(false);

    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature,
        private readonly __dao_anim : IDao_Anim
    ) { }

    public get_center_zoom_point(): Vector<3> 
    {
        return this.__dao_anim.get_center_zoom_point();
    }

    public init_stop_zoom_condition(): Ptr<boolean> 
    {
        this.__stop_zoom_condition._ = false;
        
        return this.__stop_zoom_condition;
    }

    public set_stop_zoom_condition_to(value: boolean): void 
    {
        this.__stop_zoom_condition._ = value;
    }

    public get_all_zooms_positions() : IZoom_Positions[] 
    {
        const containers : Container[] = this.__dao_container.get_all_containers_of_the_current_flow(); 
        const ligatures : Ligature[] = this.__dao_ligature.get_all_ligatures_of_the_current_flow();

        const result : IZoom_Positions[] = [];

        containers.forEach(container => result.push(new Container_Zoom_Positions(container)));
        ligatures.forEach(ligature => result.push(new Ligature_Zoom_Positions(ligature)));

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
        const factor = this.__alpha ** this.__zoom_level;

        return factor;
    }

    public update_zoom_level(level: number) : number
    {
        this.__zoom_level = level;
        
        const factor = this.__alpha ** this.__zoom_level;

        return factor;
    }

    public get_current_level() : number
    {
        return this.__zoom_level;
    }

    public get_alpha() : number
    {
        return this.__alpha;
    }
}