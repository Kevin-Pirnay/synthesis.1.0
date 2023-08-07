import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector_ } from "../../common/Vector/Vector_";
import { Container } from "./Container";

export class Ligature
{
    private readonly abs_ratio : Matrix<3> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero()]);

    constructor(public parent : Container, public child : Container) { }
}