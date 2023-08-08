import { Ligature } from './../../../domain/entities/Ligature';
import { Container } from "../../../domain/entities/Container/Container";

export interface ICreateRepository
{
    save_root(container : Container) : void;
    save_unit(ligature : Ligature, container : Container) : void;
    
}