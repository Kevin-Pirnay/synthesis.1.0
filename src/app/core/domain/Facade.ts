import { Delete_Container_Repository } from './repository/implementations/Delete_Repository';
import { IDelete_Container_Repository } from './repository/interfaces/IDelete_Repository';
import { Create_Container_Use_case } from './use_cases/Create_Container';
import { Create_Container_Request } from "../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from '../port/driver/response/Create_Container_Response';
import { Move_Container_Request } from '../port/driver/request/Move_Container_Request';
import { Move_Container_Use_case } from './use_cases/Move_Container';
import { Zoom_Use_case } from './use_cases/Zoom';
import { Zoom_Request } from '../port/driver/request/Zoom_Request';
import { CreateRepository } from './repository/implementations/CreateRepository';
import { ICreateRepository } from './repository/interfaces/ICreateRepository';
import { IZoomRepository } from './repository/interfaces/IZoomRepository';
import { ZoomRepository } from './repository/implementations/ZoomRepository';
import { IDao_Container } from '../port/driven/dao/IDao_Container';
import { Dao_Container } from '../../adapters/driven/dao/Dao_Container';
import { IDao_Ligature } from '../port/driven/dao/IDao_Ligature';
import { Dao_Ligature } from '../../adapters/driven/dao/Dao_Ligature';
import { Runtime_Persistence } from '../../adapters/driven/runtime_memory/Runtime_Persistence';
import { IInsert_Handler } from './handlers/Insert/IInsert_Handler';
import { Insert_Handler } from './handlers/Insert/Insert_Handler';
import { IZoom_Handeler } from './handlers/Zoom/IZoom_Handeler';
import { Zoom_Handeler } from './handlers/Zoom/Zoom_Handeler';
import { Delete_Container_Request } from '../port/driver/request/Delete_Container_Request';
import { Delete_Container_Response } from '../port/driver/response/Delete_Container_Response';
import { Delete_Container_Use_case } from './use_cases/Delete_Container';
import { Move_View_Request } from '../port/driver/request/Move_View_Request';
import { Move_View_Use_case } from './use_cases/Move_View';
import { IMove_View_Repository } from './repository/interfaces/IMove_View_Repository';
import { Move_View_Repository } from './repository/implementations/Move_View_Repository';
import { View_As_Root_Use_case } from './use_cases/View_As_Root';
import { IView_As_Root_Repository } from './repository/interfaces/IView_As_Root_Repository';
import { View_As_Root_Repository } from './repository/implementations/View_As_Root_Repository';
import { View_As_Root_Request } from '../port/driver/request/View_As_Root_Request';
import { View_As_Root_Response } from '../port/driver/response/View_As_Root_Response';

export class Facade
{
    private readonly __runtime_persistence = new Runtime_Persistence();

    private readonly __dao_container : IDao_Container = new Dao_Container(this.__runtime_persistence);
    private readonly __dao_ligature : IDao_Ligature = new Dao_Ligature(this.__runtime_persistence);

    private readonly __create_repository : ICreateRepository = new CreateRepository(this.__dao_container, this.__dao_ligature);
    private readonly __zoom_repository : IZoomRepository = new ZoomRepository(this.__dao_container, this.__dao_ligature);
    private readonly __delete_repository : IDelete_Container_Repository = new Delete_Container_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __move_view_repository : IMove_View_Repository = new Move_View_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __view_as_root_repository : IView_As_Root_Repository = new View_As_Root_Repository();

    private readonly __zoom_handler : IZoom_Handeler = new Zoom_Handeler();
    private readonly __insert_handler : IInsert_Handler = new Insert_Handler(this.__zoom_repository);

    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository, this.__insert_handler);
    private readonly __move_container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_repository, this.__zoom_handler);
    private readonly __delete_container_use_case = new Delete_Container_Use_case(this.__delete_repository);
    private readonly __move_view_use_case = new Move_View_Use_case(this.__move_view_repository);
    private readonly __view_as_root_use_case = new View_As_Root_Use_case(this.__view_as_root_repository);

    public execute_create_container(request : Create_Container_Request) : Create_Container_Response
    {
        return this.__create_container_use_case.handle(request);
    }

    public execute_move_container(request : Move_Container_Request) : void
    {
        this.__move_container_Use_case.handle(request);
    }

    public execute_zoom(request :Zoom_Request) : void
    {
        this.__zoom_use_case.handle(request);
    }

    public execute_delete_container(request : Delete_Container_Request) : Delete_Container_Response
    {
        return this.__delete_container_use_case.handle(request);
    }

    public execute_move_view(request : Move_View_Request) : void
    {
        this.__move_view_use_case.handle(request);
    } 

    public execute_view_as_root(request : View_As_Root_Request) : View_As_Root_Response
    {
        return this.__view_as_root_use_case.handle(request);
    }
}