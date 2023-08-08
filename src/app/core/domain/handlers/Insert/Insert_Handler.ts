import { Ligature } from './../../entities/Ligature';
import { Container } from '../../entities/Container';
import { IZoomRepository } from '../../repository/interfaces/IZoomRepository';
import { IZoom_Positions } from '../../use_cases/Zoom';
import { IZoom_Handeler } from '../Zoom/IZoom_Handeler';
import { IInsert_Handler } from './IInsert_Handler';

export class Insert_Handler implements IInsert_Handler
{
    constructor(private readonly __zoom_repository : IZoomRepository) { }

    public insert_container_into_the_game(container: Container): void 
    {
        const zoom_factor : number = this.__zoom_repository.get_zoom_factor();

        const abs_ratio = container.positions.rel_ratio.__.multiply_by_factor_new(zoom_factor).__.add_by_vector_new(container.positions.abs_root);

        container.positions.abs_ratio.__.assign_new_data(abs_ratio);
    }

    public insert_unit_into_the_game(ligature : Ligature, container: Container): void 
    {
        this.insert_container_into_the_game(container);

        ligature.__.update_ratio();
    }
}