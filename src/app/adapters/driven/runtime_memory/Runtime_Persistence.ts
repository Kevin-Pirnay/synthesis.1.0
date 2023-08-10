import { Container, Container_Positions, Node } from "../../../core/domain/entities/Container"
import { Ligature, Ligature_Positions } from "../../../core/domain/entities/Ligature"

export class Runtime_Persistence
{
    public readonly containers_ids : string[] = [];
    public readonly containers_flow : { [id : string]: { [flow : string] : IContainer_Data_Flow } } = { }
    public readonly containers_fix : { [id : string]:  IContainer_Data_Fix } = { }

    public readonly ligatures_ids : string[] = [];
    public readonly ligatures_flow : { [id : string]: { [flow : string] : ILigature_Data_Flow } } = { }
    public readonly ligatures_fix : { [id : string]:  ILigature_Data_Fix } = { }


    public readonly stack_flows : string[] = [];
    public readonly flows : string[] = [];
}

export interface IContainer_Data_Fix
{
    id : string;
    root: string[];
}

export interface IContainer_Data_Flow
{
    node : Node;
    positions : Container_Positions;
}

export interface ILigature_Data_Fix
{
    id : string;
}

export interface ILigature_Data_Flow
{
    parent : Container;
    child : Container;
    positions : Ligature_Positions;
}