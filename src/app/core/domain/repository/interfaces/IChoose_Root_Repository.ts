import { Container } from "../../entities/Container";
import { IChoose_Root_Container } from "../../use_cases/Choose_Root";

export interface IChoose_Root_Repository
{
    get_choose_root_container(container : Container): IChoose_Root_Container;

}