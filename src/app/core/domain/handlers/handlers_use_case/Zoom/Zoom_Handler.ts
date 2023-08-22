import { Ptr_Boolean } from '../../../../common/Ptr_Boolean';
import { Vector } from '../../../../common/Vector/Vector';
import { Vector_ } from '../../../../common/Vector/Vector_';
import { Container } from '../../../entities/Container';
import { Ligature } from '../../../entities/Ligature';
import { IZoom_Repository } from '../../../repository/interfaces/IRepository';
import { IZoom_Handler } from './IZoom_Handler';


export class Zoom_Handler implements IZoom_Handler
{
    private readonly __center : Vector<3>;

    constructor(private readonly __repository : IZoom_Repository) 
    {
        this.__center = __repository.get_center_zoom_point();
    }

    public get_current_unzoom_factor() :  number
    {
        return this.__repository.get_unzoom_factor();
    }

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
        this.__zoom(this.__center, positions, unzoom_factor);        
        
        //zoom all the positions by adding one to the factor zoom
        const zoom_factor = this.__repository.update_zoom_factor(direction);
        this.__zoom(this.__center, positions, zoom_factor); 
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

    public reinit_zoom_level(): void 
    {
        this.__repository.update_zoom_level(0);
    }

    public zoom_current_flow_by_level(level: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        //unzoom all the positions
        const unzoom_factor = this.__repository.get_unzoom_factor();
        this.__zoom(this.__center, positions, unzoom_factor);

        //zoom by factor
        const zoom_factor = this.__repository.update_zoom_level(level);
        this.__zoom(this.__center, positions, zoom_factor);
    }

    public zoom_current_flow_by_level_toward_this_point(level: number, point : Vector<3>): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        //unzoom all the positions
        const unzoom_factor = this.__repository.get_unzoom_factor();
        this.__zoom(point, positions, unzoom_factor);

        //zoom by factor
        const zoom_factor = this.__repository.update_zoom_level(level);
        this.__zoom(point, positions, zoom_factor);
    }

    public get_current_level() : number
    {
        return this.__repository.get_current_level();
    }

    public get_alpha() : number
    {
        return this.__repository.get_alpha();
    }

    public zoom_on_a_point(point_to_zoom : Vector<3>, factor : number) : void
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        this.__zoom(point_to_zoom, positions, factor );
    }
    
    private __zoom(point_to_zoom : Vector<3> ,positions : IZoom_Positions[], factor : number) : void
    {
        positions.forEach((position : IZoom_Positions) =>
        {
            //move center to origin
            position.substract_abs_pos_by_delta(point_to_zoom);

            //multiply factor
            position.multiply_abs_pos_by_factor(factor);

            //move back to center 
            position.add_abs_pos_by_delta(point_to_zoom);
        });
    }
}

export interface IZoom_Positions
{
    substract_abs_pos_by_delta(delta : Vector<3>) : void;
    multiply_abs_pos_by_factor(factor : number) : void;
    add_abs_pos_by_delta(delta : Vector<3>) : void;
}

