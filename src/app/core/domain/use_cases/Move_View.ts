import { IMove_View_Handler } from './../handlers/handlers_use_case/Move_View/IMove_View_Handler';
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Move_View_Request } from '../../port/driver/request/request';


export class Move_View_Use_case
{
    constructor(private readonly __move_view_handler : IMove_View_Handler) { }

    public handle_request_move_view(request : Move_View_Request) : void 
    {
        //*** put that in memory
        const step : number = 5;

        let delta = new Vector();

        switch (request.direction) 
        {
            case "ArrowLeft": delta = Vector_.new([step, 0]); break;

            case "ArrowRight": delta = Vector_.new([-step, 0]); break;

            case "ArrowUp": delta = Vector_.new([0, step]); break;

            case "ArrowDown": delta = Vector_.new([0, -step]); break;
        
            default: throw new Error("the key must be an arrow key");
        }

        this.__move_view_handler.move_view_by_delta_in_contious_async(delta);
    }

    public handle_request_stop_move_view() : void
    {
        this.__move_view_handler.stop_move_view();
    }
}