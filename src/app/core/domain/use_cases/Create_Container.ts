import { Matrix } from "../../common/Matrix/Matrix";
import { Vector } from "../../common/Vector/Vector";
import { Vector_ } from "../../common/Vector/Vector_";
import { Dto } from "../../port/driver/dto/Dto";
import { Dto_Type, IDto } from "../../port/driver/dto/IDto";
import { Create_Container_Request } from "../../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from "../../port/driver/response/Create_Container_Response";
import { Container, Container_ } from "../entities/Container/Container";
import { Ligature, Ligature_ } from "../entities/Ligature";

export class Create_Container_Use_case
{
    public handle = (request: Create_Container_Request) : Create_Container_Response =>
    {
        //need handle zoom

        const ratio : Matrix<4> = new Matrix([
            Vector_.zero(),
            Vector_.new([30,0]),
            Vector_.new([30,30]),
            Vector_.new([0,30])
        ]);

        const pos_target : Vector = request.click_position;

        const abs_root : Vector = Vector_.new([100,100]);

        const container1 : Container = Container_.new(ratio, abs_root, Vector_.zero());
        
        const container2 : Container = Container_.new(ratio, pos_target, container1.positions.abs_root);

        const ligature : Ligature = Ligature_.new(container1, container2);

        const dtos : IDto[] = [
            new Dto(container1, Dto_Type.CONTAINER), 
            new Dto(container2, Dto_Type.CONTAINER), 
            new Dto(ligature, Dto_Type.LIGATURE)
        ]
        
        return new Create_Container_Response(dtos);
    }
}