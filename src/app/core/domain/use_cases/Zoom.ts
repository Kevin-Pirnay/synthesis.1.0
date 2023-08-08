import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { IZoomRepository } from "../../port/driven/repository/IZoomRepository";
import { Zoom_Request } from "../../port/driver/request/Zoom_Request";

export class Zoom_Use_case
{
    private readonly __repository : IZoomRepository;

    constructor(repository : IZoomRepository)
    {
        this.__repository = repository;
    }

    public handle = (request : Zoom_Request) : void =>
    {
        const factor = this.__repository.update_zoom_factor(request.direction);

        

        this.__zoom(factor);
    }

    private __zoom = (positions : IPositions[], factor : number) : void =>
    {
        const center : Vector = Vector_.new([window.innerWidth / 2, window.innerHeight / 2]);

        //need plymorphisme

        positions.forEach((position : IPositions) =>
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

export interface IPositions
{
    substract_abs_pos_by_delta(delta : Vector) : void;
    multiply_abs_pos_by_factor(factor : number) : void;
    add_abs_pos_by_delta(delta : Vector) : void;
}