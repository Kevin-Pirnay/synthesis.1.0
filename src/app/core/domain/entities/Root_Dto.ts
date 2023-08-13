import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector_ } from "../../common/Vector/Vector_";

export class Root_Dto
{
    public readonly root_id :string;
     
    constructor(root_id :string)
    {
        this.root_id = root_id;
        
        const abs_ratio = new Matrix(
            [
                Vector_.zero(),
                Vector_.new([30,0]),
                Vector_.new([30,30]),
                Vector_.new([0,30])
            ]
        );
        this.positions.abs_ratio.__.assign_new_data(abs_ratio);
    }

    positions = new Root_Dto_Position();

}

class Root_Dto_Position
{
    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(), Vector_.zero(), Vector_.zero(), Vector_.zero()]);
}