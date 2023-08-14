import { Matrix } from './../../../common/Matrix/Matrix';
import { IDto } from './../../../port/driver/dto/IDto';
import { IMove_View_Repository } from "../../repository/interfaces/IMove_View_Repository";
import { IMove_View_Handler } from "./IMove_View_Handler";
import { Vector } from "../../../common/Vector/Vector";
import { IMove_View_Positions } from "../../use_cases/Move_View";
import { Vector_ } from "../../../common/Vector/Vector_";

export class Move_View_Handler implements IMove_View_Handler
{
    constructor(private readonly __repository : IMove_View_Repository) { }

    //params_start : vector 0 : translation, vector 1 : rotation // radian
    //params_result : vector 0 : translation(point rotation), vector 1 : rotation -> fraction angle to rotate -> between 0 and 1
    public async rotate_project(dtos : IDto[], params_start: Matrix<2>, params_result: Matrix<2>, max_angle : number, rate: number, direction: number): Promise<void> 
    {
        const positions : IMove_View_Positions[] = this.__repository.get_positions(dtos);

        const copies : Matrix<any>[] = [];

        positions.forEach(position => copies.push(position.copy()));

        positions.forEach(position => position.assign_values(position.copy().__.rotate_x_new(params_start._[1]._[0]).__.rotate_y_new(params_start._[1]._[1]).__.rotate_z_new(params_start._[1]._[2]).__.add_by_vector_new(params_result._[0])));

        let angle = 0;
        let radian = 0;
        while(1)
        {
            radian = direction * angle * Math.PI / 180;

            for(let i = 0; i < copies.length; i++)
            {
                positions[i].assign_values(copies[i].__.rotate_x_new(radian * params_result._[1]._[0]).__.rotate_y_new(radian * params_result._[1]._[1]).__.rotate_z_new(radian * params_result._[1]._[2]).__.add_by_vector_new(params_result._[0]));
            }

            await new Promise(r => setTimeout(r, 1));

            angle += (1 * rate);
            
            if(Math.abs(angle) >= max_angle) break;
        }
    }

    public async rotate_current_project(max_angle: number, axis: number, direction: number, rate: number): Promise<void> 
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_positions();
        const copies : Matrix<any>[] = [];
        positions.forEach(position => copies.push(position.copy()));

        positions.forEach(position => position.assign_values(position.copy().__.add_by_vector_new(Vector_.new([0,0,250]))));

        let angle = 0;
        let radian = 0;
        while(1)
        {
            radian = direction * angle * Math.PI / 180;

            for(let i = 0; i < copies.length; i++)
            {
                positions[i].assign_values(copies[i].__.rotate_y_new(radian));
            }

            await new Promise(r => setTimeout(r, 1));
            angle += (1 * rate);
            if(Math.abs(angle) >= max_angle) break;
        }
    }

    public move_view_by_delta(delta : Vector) : void
    {
        const positions : IMove_View_Positions[] = this.__repository.get_all_positions();

        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }
}