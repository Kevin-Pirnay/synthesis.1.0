import { Container, Container_Positions, Node } from "../../../core/domain/entities/Container";
import { Flow } from "../../../core/domain/entities/Flow";
import { Ligature, Ligature_Positions } from "../../../core/domain/entities/Ligature";


export class Runtime_Persistence
{
    constructor(private readonly __flow : Flow) { }

    public readonly containers_ids : { [flow : string] : string[] } = { }
    public readonly containers_data_flow : { [id : string]: { [flow : string] : IContainer_Data_Flow } } = { }
    public readonly containers_data_fix : { [id : string]:  Container } = { }

    public readonly ligatures_ids : { [flow : string] : string[] } = { }
    public readonly ligatures_data_flow : { [id : string]: { [flow : string] : ILigature_Data_Flow } } = { }
    public readonly ligatures_data_fix : { [id : string]:  Ligature } = { }

    public readonly current_flow : Flow = this.__flow;
    public readonly flows : string[] = [];
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