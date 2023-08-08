import { Vector } from "../../../common/Vector/Vector";
import { IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";
import { ISubtree_Data } from "../../use_cases/View_As_Root";
import { IView_As_Root_Repository } from "../interfaces/IView_As_Root_Repository";

export class View_As_Root_Repository implements IView_As_Root_Repository
{
    public get_subtree(container: Container): ISubtree_Data 
    {
        throw new Error("Method not implemented.");
    }
}

class Subtree_Data implements ISubtree_Data
{
    public set_its_positions(pos: Vector): void 
    {
        throw new Error("Method not implemented.");
    }

    public add_children_to_the_frontier(frontier: ISubtree_Data[]): void 
    {
        throw new Error("Method not implemented.");
    }

    public added_to_the_result(result: IDto[]): void 
    {
        throw new Error("Method not implemented.");
    }

    public update_current_pos_root(current_pos_root: Vector): void 
    {
        throw new Error("Method not implemented.");
    }
}