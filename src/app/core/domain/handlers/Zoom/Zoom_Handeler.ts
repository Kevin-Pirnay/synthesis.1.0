import { Vector } from "../../../common/Vector/Vector";
import { Vector_ } from "../../../common/Vector/Vector_";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";
import { IZoomRepository } from "../../repository/interfaces/IZoomRepository";
import { IZoom_Positions } from "../../use_cases/Zoom";
import { IZoom_Handeler } from "./IZoom_Handeler";

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