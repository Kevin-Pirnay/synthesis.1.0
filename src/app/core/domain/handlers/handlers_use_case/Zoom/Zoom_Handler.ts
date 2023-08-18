import { Ptr_Boolean } from '../../../../common/Ptr_Boolean';
import { Vector } from '../../../../common/Vector/Vector';
import { Vector_ } from '../../../../common/Vector/Vector_';
import { Container } from '../../../entities/Container';
import { Ligature } from '../../../entities/Ligature';
import { IZoom_Repository } from '../../../repository/interfaces/IRepository';
import { IZoom_Handler } from './IZoom_Handler';


export class Zoom_Handler implements IZoom_Handler
{
    constructor(private readonly __repository : IZoom_Repository) { }

    get_current_zoom_fator() : number
    {
        return this.__repository.get_zoom_factor();
    }

    public update_container_with_current_zoom(container: Container): void 
    {
        const zoom_factor : number = this.__repository.get_zoom_factor();

        const abs_ratio = container.positions.rel_ratio.__.multiply_by_factor_new(zoom_factor).__.add_by_vector_new(container.positions.abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);
    }

    public update_unit_with_current_zoom(ligature : Ligature, container: Container): void 
    {
        this.update_container_with_current_zoom(container);

        ligature.__.update_ratio();
    }

    public zoom_by_direction(direction: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        //unzoom all the positions
        const unzoom_factor = this.__repository.get_unzoom_factor();
        this.__zoom(positions, unzoom_factor);        
        
        //zoom all the positions by adding one to the factor zoom
        const zoom_factor = this.__repository.update_zoom_factor(direction);
        this.__zoom(positions, zoom_factor); 
    }

    public async zoom_by_direction_in_contious_async(direction: number) : Promise<void>
    {
        const ptr_condition : Ptr_Boolean = this.__repository.init_stop_zoom_condition();

        while(1)
        {
            if ( ptr_condition.value ) break;

            this.zoom_by_direction(direction);

            await new Promise(r => setTimeout(r,1));
        }
    }

    public stop_zoom() : void
    {
        this.__repository.set_stop_zoom_condition_to(true);
    }

    public zoom_current_flow_by_level(level: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        //unzoom all the positions
        const unzoom_factor = this.__repository.get_unzoom_factor();
        this.__zoom(positions, unzoom_factor);

        //zoom by factor
        const zoom_factor = this.__repository.update_zoom_level(level);
        this.__zoom(positions, zoom_factor);
    }

    public get_current_level() : number
    {
        return this.__repository.get_current_level();
    }

    public get_alpha() : number
    {
        return this.__repository.get_alpha();
    }
    
    private __zoom(positions : IZoom_Positions[], factor : number) : void
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

export interface IZoom_Positions
{
    substract_abs_pos_by_delta(delta : Vector) : void;
    multiply_abs_pos_by_factor(factor : number) : void;
    add_abs_pos_by_delta(delta : Vector) : void;
}

