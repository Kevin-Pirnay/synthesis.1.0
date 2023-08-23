import { Vector } from "../../../../common/Vector/Vector";
import { IData_Tree } from "./IData_Tree";


export interface ISubtree_Root {
    set_its_positions(pos: Vector<3>): void;
    add_children_to_the_frontier(frontier: ISubtree_Root[], children: ISubtree_Root[]): void;
    added_to_the_result(result: IData_Tree[]): void;
    get_his_children(): ISubtree_Root[];
    set_children_positions(children: ISubtree_Root[]): void;
}
