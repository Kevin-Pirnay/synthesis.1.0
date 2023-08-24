import { Ptr } from "../../../core/common/Ptr";
import { Vector } from "../../../core/common/Vector/Vector";
import { Vector_ } from "../../../core/common/Vector/Vector_";
import { Container, Container_Positions, Node } from "../../../core/domain/entities/Container";
import { Ligature, Ligature_Positions } from "../../../core/domain/entities/Ligature";


export class Runtime_Persistence
{
    constructor(private readonly __flow : Ptr<string>) { }

    public readonly containers_ids : { [flow : string] : string[] } = { }
    public readonly containers_data_flow : { [id : string]: { [flow : string] : IContainer_Data_Flow } } = { }
    public readonly containers_data_fix : { [id : string]:  Container } = { }

    public readonly ligatures_ids : { [flow : string] : string[] } = { }
    public readonly ligatures_data_flow : { [id : string]: { [flow : string] : ILigature_Data_Flow } } = { }
    public readonly ligatures_data_fix : { [id : string]:  Ligature } = { }

    public readonly flows_ids : string[] = [];
    public readonly flows : { [flow : string] : Flow } = { };
    public readonly current_flow : Ptr<string> = this.__flow;

    public readonly default_position_of_the_root: Vector<3> = Vector_.new([150,400,0]);
}

export interface IContainer_Data_Flow
{
    node : Node;
    positions : Container_Positions;
}

export interface ILigature_Data_Flow
{
    parent : Container;
    child : Container;
    positions : Ligature_Positions;
}

export class Flow
{
    public readonly id : string;
    public parent : string | null = null;
    public readonly children : string[] = [];

    constructor(id : string)
    {
        this.id = id;
    }
}