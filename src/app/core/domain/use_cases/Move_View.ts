import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Move_View_Request } from "../../port/driver/request/Move_View_Request";
import { IMove_View_Repository } from "../repository/interfaces/IMove_View_Repository";

export class Move_View_Use_case
{
    constructor(private readonly __move_view_repository : IMove_View_Repository) { }

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

            const positions : IMove_View_Positions[] = this.__move_view_repository.get_all_positions();

            this.__move_view(positions, delta_vec);
        }

    private __move_view(positions : IMove_View_Positions[], delta : Vector)
    {
        positions.forEach(position =>
        {
            position.move_by_delta(delta);
        });
    }
}

export interface IMove_View_Positions
{
    move_by_delta(delta : Vector) : void;
}