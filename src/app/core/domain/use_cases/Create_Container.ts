import { Matrix } from "../../common/Matrix/Matrix";
import { Vector_ } from "../../common/Vector/Vector_";
import { ICreateRepository } from "../../port/driven/repository/ICreateRepository";
import { Dto } from "../../port/driver/dto/Dto";
import { Dto_Type, IDto } from "../../port/driver/dto/IDto";
import { Create_Container_Request } from "../../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from "../../port/driver/response/Create_Container_Response";
import { Container, Container_ } from "../entities/Container/Container";
import { Ligature, Ligature_ } from "../entities/Ligature";

export class Create_Container_Use_case
{
    constructor(private readonly __repository : ICreateRepository) { }

    public handle = (request: Create_Container_Request) : Create_Container_Response =>
    {
        //need handle zoom

        const ratio : Matrix<4> = new Matrix([
            Vector_.zero(),
            Vector_.new([30,0]),
            Vector_.new([30,30]),
            Vector_.new([0,30])
        ]);

        //const root : Vector = Vector_.new([100,100]);

        if ( request.parent_container == null )
        {
            const container : Container = Container_.new(ratio, request.position, Vector_.zero());

            this.__repository.save_root(container);

            return new Create_Container_Response([new Dto(container, Dto_Type.CONTAINER)]);
        }

        const container : Container = Container_.new(ratio, request.position, request.parent_container.positions.abs_root);

        const ligature : Ligature = Ligature_.new(request.parent_container, container);

        request.parent_container.__.link_node_unit(ligature, container);

        this.__repository.save_unit(ligature, container);

        const dtos : IDto[] = [ new Dto(container, Dto_Type.CONTAINER), new Dto(ligature, Dto_Type.LIGATURE) ]
        
        return new Create_Container_Response(dtos);
    }
}