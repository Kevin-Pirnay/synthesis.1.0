import { Matrix } from '../../../../common/Matrix/Matrix';
import { Ptr } from '../../../../common/Ptr';
import { Vector } from '../../../../common/Vector/Vector';
import { IZoom_Repository } from '../../../repository/interfaces/IRepository';
import { IData_Tree } from '../View_As_Root/IData_Tree';
import { IZoom_Handler } from './IZoom_Handler';
import { IZoom_Positions } from './IZoom_Positions';


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

    public get_current_zoom_fator() : number
    {
        return this.__repository.get_zoom_factor();
    }

    public update_this_ratio_with_the_current_zoom(ratio : Matrix<any>) : Matrix<any>
    {
        const zoom_factor : number = this.__repository.get_zoom_factor();

        return ratio.__.multiply_by_factor_new(zoom_factor);
    }

    public zoom_by_direction(direction: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        const unzoom_factor = this.__repository.get_unzoom_factor();

        this.__zoom(this.__center, positions, unzoom_factor);        
        
        const zoom_factor = this.__repository.update_zoom_factor(direction);

        this.__zoom(this.__center, positions, zoom_factor); 
    }

    public async zoom_by_direction_in_contious_async(direction: number) : Promise<void>
    {
        const ptr_condition : Ptr<boolean> = this.__repository.init_stop_zoom_condition();

        while(1)
        {
            if ( ptr_condition._ ) break;

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

        const unzoom_factor = this.__repository.get_unzoom_factor();

        this.__zoom(this.__center, positions, unzoom_factor);

        const zoom_factor = this.__repository.update_zoom_level(level);

        this.__zoom(this.__center, positions, zoom_factor);
    }

    public zoom_current_flow_by_factor_from_the_current_factor(factor: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions(); 
        
        this.__zoom(this.__center, positions, factor); 
    }

    public zoom_current_flow_by_factor(factor: number): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions(); 

        const unzoom_factor = this.__repository.get_unzoom_factor();

        this.__zoom(this.__center, positions, unzoom_factor);
        
        this.__zoom(this.__center, positions, factor); 
    }

    public zoom_current_data_tree_to_the_current_factor(data : IData_Tree[]) : void
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions_from_data_tree(data);

        const current_zoom_factor : number = this.__repository.get_zoom_factor();

        this.__zoom(this.__center, positions, current_zoom_factor);
    }

    public zoom_current_flow_by_level_toward_this_point(level: number, point : Vector<3>): void 
    {
        const positions : IZoom_Positions[] = this.__repository.get_all_zooms_positions();

        const unzoom_factor = this.__repository.get_unzoom_factor();

        this.__zoom(point, positions, unzoom_factor);

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

