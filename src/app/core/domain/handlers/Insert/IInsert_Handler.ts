import { Ligature } from './../../entities/Ligature';
import { Container } from "../../entities/Container";

export interface IInsert_Handler
{
    insert_unit_into_the_game(ligature : Ligature, container: Container): void;
    insert_container_into_the_game(container: Container): void;
}