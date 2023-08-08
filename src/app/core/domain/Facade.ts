import { Create_Container_Use_case } from './use_cases/Create_Container';
import { Create_Container_Request } from "../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from '../port/driver/response/Create_Container_Response';
import { Move_Container_Request } from '../port/driver/request/Move_Container_Request';
import { Move_Container_Use_case } from './use_cases/Move_Container';
import { Zoom_Use_case } from './use_cases/Zoom';
import { Zoom_Request } from '../port/driver/request/Zoom_Request';
import { CreateRepository } from './repository/implementation/CreateRepository';
import { ICreateRepository } from './repository/interfaces/ICreateRepository';
import { IZoomRepository } from './repository/interfaces/IZoomRepository';
import { ZoomRepository } from './repository/implementation/ZoomRepository';
import { IDao_Container } from '../port/driven/dao/IDao_Container';
import { Dao_Container } from '../../adapters/driven/dao/Dao_Container';
import { IDao_Ligature } from '../port/driven/dao/IDao_Ligature';
import { Dao_Ligature } from '../../adapters/driven/dao/Dao_Ligature';
import { Runtime_Persistence } from '../../adapters/driven/runtime_memory/Runtime_Persistence';

export class Facade
{
    private readonly __runtime_persistence = new Runtime_Persistence();
    private readonly __dao_container : IDao_Container = new Dao_Container(this.__runtime_persistence);
    private readonly __dao_ligature : IDao_Ligature = new Dao_Ligature(this.__runtime_persistence);
    private readonly __create_repository : ICreateRepository = new CreateRepository(this.__dao_container, this.__dao_ligature);
    private readonly __zoom_repository : IZoomRepository = new ZoomRepository(this.__dao_container, this.__dao_ligature);
    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository);
    private readonly __move_Container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_repository);

    public create_container(request : Create_Container_Request) : Create_Container_Response
    {
        return this.__create_container_use_case.handle(request);
    }

    public move_container(request : Move_Container_Request) : void
    {
        this.__move_Container_Use_case.handle(request);
    }

    public zoom(request :Zoom_Request) : void
    {
        this.__zoom_use_case.handle(request);
    }
}