import { Ligature } from '../../entities/Ligature';
import { Container } from "../../entities/Container";
import { Matrix } from '../../../common/Matrix/Matrix';

export interface ICreateRepository
{
    get_default_container_ratio(): Matrix<4>;
    save_root(container : Container) : void;
    save_unit(ligature : Ligature, container : Container) : void;
    
}