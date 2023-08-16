import { Ptr_Boolean } from "../../../common/Ptr_Boolean";
import { IDao_Container } from "../../../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoom_Positions } from "../../handlers/handlers_use_case/Zoom/Zoom_Handler";
import { IZoom_Repository } from "../interfaces/IRepository";
import { Container_Zoom_Positions } from "./injectors/Zoom_Positions";
import { Ligature_Zoom_Positions } from "./injectors/Zoom_Positions";


export class Zoom_Repository implements IZoom_Repository
{
    private __zoom_level : number = 0;
    private __alpha : number = 1.01;
    private readonly __stop_zoom_condition : Ptr_Boolean = new Ptr_Boolean();

    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }

    public init_stop_zoom_condition(): Ptr_Boolean 
    {
        this.__stop_zoom_condition.value = false;
        
        return this.__stop_zoom_condition;
    }

    public set_stop_zoom_condition_to(value: boolean): void 
    {
        this.__stop_zoom_condition.value = value;
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
        return this.__alpha ** this.__zoom_level;
    }
}