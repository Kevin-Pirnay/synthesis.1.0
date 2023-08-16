import { Matrix } from "../../../common/Matrix/Matrix";
import { Container } from "../../entities/Container";
import { Ligature } from "../../entities/Ligature";


export interface ICreate_Repository {
    get_default_container_rel_ratio(): Matrix<4>;
    save_root(container: Container): void;
    save_unit(ligature: Ligature, container: Container): void;
}
