import { Matrix } from "../../common/Matrix/Matrix";
import { Matrix_ } from "../../common/Matrix/Matrix_";
import { Vector_ } from "../../common/Vector/Vector_";

export class Root_Choice
{
    public readonly flow :string;
    public readonly positions = new Root_Choice_Position();
     
    constructor(flow :string)
    {
        this.flow = flow;
        
        //change that
        const abs_ratio = new Matrix(
            [
                Vector_.zero(3),
                Vector_.new([30,0,0]),
                Vector_.new([30,30,0]),
                Vector_.new([0,30,0])
            ]
        );
        this.positions.abs_ratio.__.assign_new_data(abs_ratio);
    }
}

class Root_Choice_Position
{
    public readonly abs_ratio : Matrix<4> = Matrix_.new([Vector_.zero(3), Vector_.zero(3), Vector_.zero(3), Vector_.zero(3)]);
}