import { Create_Container_Use_case } from './use_cases/Create_Container';
import { Create_Container_Request } from "../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from '../port/driver/response/Create_Container_Response';
import { Move_Container_Request } from '../port/driver/request/Move_Container_Request';
import { Move_Container_Use_case } from './use_cases/Move_Container';
import { Zoom_Use_case } from './use_cases/Zoom';
import { Zoom_Request } from '../port/driver/request/Zoom_Request';
import { ZoomRepository } from '../../adapters/driven/runtime_memory/ZoomRepository';
import { CreateRepository } from '../../adapters/driven/runtime_memory/CreateRepository';
import { ICreateRepository } from '../port/driven/repository/ICreateRepository';
import { IZoomRepository } from '../port/driven/repository/IZoomRepository';

export class Facade
{
    private readonly __create_repository : ICreateRepository = new CreateRepository();
    private readonly __zoom_repository : IZoomRepository = new ZoomRepository();
    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository);
    private readonly __move_Container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_repository);

    public create_container = (request : Create_Container_Request) : Create_Container_Response =>
    {
        return this.__create_container_use_case.handle(request);
    }

    public move_container = (request : Move_Container_Request) : void =>
    {
        this.__move_Container_Use_case.handle(request);
    }

    public zoom = (request :Zoom_Request) : void =>
    {
        this.__zoom_use_case.handle(request);
    }
}