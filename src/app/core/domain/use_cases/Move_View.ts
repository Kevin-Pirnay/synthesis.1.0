import { IMove_View_Handler } from './../handlers/Move_View/IMove_View_Handler';
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Move_View_Request } from "../../port/driver/request/Move_View_Request";
import { Matrix } from '../../common/Matrix/Matrix';

export class Move_View_Use_case
{
    constructor(private readonly __move_view_handler : IMove_View_Handler) { }

    public handle(request : Move_View_Request) : void 
    {
        const delta : number = 10;
        let delta_vec = new Vector();

        switch (request.direction) 
        {
            case "ArrowLeft":
                delta_vec = Vector_.new([delta, 0])
            break;

            case "ArrowRight":
                delta_vec = Vector_.new([-delta, 0])
            break;

            case "ArrowUp":
                delta_vec = Vector_.new([0, delta])
            break;

            case "ArrowDown":
                delta_vec = Vector_.new([0, -delta])
            break;
        
            default:
                throw new Error("key must be an arrow");

            }
            this.__move_view_handler.move_view_by_delta(delta_vec);
    }
}

export interface IMove_View_Positions
{
    move_by_delta(delta : Vector) : void;
    copy() : Matrix<any>;
    assign_values(matrix : Matrix<any>) : void
}