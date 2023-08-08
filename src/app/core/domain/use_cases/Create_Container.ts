import { Matrix } from "../../common/Matrix/Matrix";
import { Vector_ } from "../../common/Vector/Vector_";
import { ICreateRepository } from "../repository/interfaces/ICreateRepository";
import { Dto } from "../../port/driver/dto/Dto";
import { Dto_Type, IDto } from "../../port/driver/dto/IDto";
import { Create_Container_Request } from "../../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from "../../port/driver/response/Create_Container_Response";
import { Container, Container_ } from "../entities/Container";
import { Ligature, Ligature_ } from "../entities/Ligature";
import { IInsert_Handler } from "../handlers/Insert/IInsert_Handler";

export class Create_Container_Use_case
{
    constructor(
        private readonly __repository : ICreateRepository,
        private readonly __insert_handler : IInsert_Handler) { }

    public handle(request: Create_Container_Request) : Create_Container_Response
    {
        //need handle zoom

        const ratio : Matrix<4> = this.__repository.get_default_container_ratio();

        //if no parent : create root
        if ( request.parent_container == null )
        {
            const container : Container = Container_.new(ratio, request.position, Vector_.zero());

            this.__repository.save_root(container);

            this.__insert_handler.insert_container_into_the_game(container);

            return new Create_Container_Response([new Dto(container, Dto_Type.CONTAINER)]);
        }

        //else : create a new unit composed by a ligature and container
        const container : Container = Container_.new(ratio, request.position, request.parent_container.positions.abs_root);

        const ligature : Ligature = Ligature_.new(request.parent_container, container);

        request.parent_container.__.link_node_unit(ligature, container);

        this.__repository.save_unit(ligature, container);

        this.__insert_handler.insert_unit_into_the_game(ligature, container);

        const dtos : IDto[] = [ new Dto(container, Dto_Type.CONTAINER), new Dto(ligature, Dto_Type.LIGATURE) ];
        
        return new Create_Container_Response(dtos);
    }
}