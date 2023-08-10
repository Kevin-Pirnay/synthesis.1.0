import { IView_As_Root_Handler } from './handlers/View_As_Root/IView_As_Root_Handler';
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
import { View_As_Root_Handler } from './handlers/View_As_Root/View_As_Root_Handler';
import { Paginate_Use_case } from './use_cases/Paginate';
import { IPaginate_Repository } from './repository/interfaces/IPaginate_Repository';
import { Paginate_Repository } from './repository/implementations/Paginate_Repository';
import { Paginate_Request } from '../port/driver/request/Paginate_request';
import { Paginate_Response } from '../port/driver/response/Paginate_Response';
import { View_Paginate_Request } from '../port/driver/request/View_Paginate_Request';
import { View_Paginate_Response } from '../port/driver/response/View_Paginate_Response';
import { View_Paginate_Use_case } from './use_cases/View_Paginate';
import { INode_Linker } from './handlers/Link_Node/INode_Linker';
import { Node_Linker } from './handlers/Link_Node/Node_Linker';
import { Move_ligature_Request } from '../port/driver/request/Move_ligature_Request';
import { Move_Ligature_Use_case } from './use_cases/Move_Ligature';
import { Assign_Ligature_Request } from '../port/driver/request/Assign_Ligature_Request';
import { Mark_As_Root_Request } from '../port/driver/request/Mark_As_Root_Request';
import { Mark_As_Root_Response } from '../port/driver/response/Mark_As_Root_Response';
import { Mark_As_Root_Use_case } from './use_cases/Mark_As_Root';
import { Mark_As_Root_Repository } from './repository/implementations/Mark_As_Root_Repository';
import { IMark_As_Root_Repository } from './repository/interfaces/IMark_As_Root_Repository';
import { Change_Root_Request } from '../port/driver/request/Change_Root_Request';
import { Change_Root_Response } from '../port/driver/response/Change_Root_Response';
import { Change_Root_Use_case } from './use_cases/Change_Root';
import { IChange_Root_Repository } from './repository/interfaces/IChange_Root_Repository';
import { Change_Root_Repository } from './repository/implementations/Change_Root_Repository';
import { Get_Flows_Response } from '../port/driver/response/Get_Flows_Response';
import { Get_Flows_Use_case } from './use_cases/Get_Flows';
import { Get_Flows_Repository } from './repository/implementations/Get_Flows_Repository';
import { IDao_Flow } from '../port/driven/dao/IDao_Flow';
import { Dao_Flow } from '../../adapters/driven/dao/Dao_Flow';

export class Facade
{
    private readonly __runtime_persistence = new Runtime_Persistence();

    private readonly __dao_container : IDao_Container = new Dao_Container(this.__runtime_persistence);
    private readonly __dao_ligature : IDao_Ligature = new Dao_Ligature(this.__runtime_persistence);
    private readonly __dao_flow : IDao_Flow = new Dao_Flow(this.__runtime_persistence);

    private readonly __create_repository : ICreateRepository = new CreateRepository(this.__dao_container, this.__dao_ligature);
    private readonly __zoom_repository : IZoomRepository = new ZoomRepository(this.__dao_container, this.__dao_ligature);
    private readonly __delete_repository : IDelete_Container_Repository = new Delete_Container_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __move_view_repository : IMove_View_Repository = new Move_View_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __view_as_root_repository : IView_As_Root_Repository = new View_As_Root_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __paginate_repository : IPaginate_Repository = new Paginate_Repository();
    private readonly __mark_as_root_repository : IMark_As_Root_Repository = new Mark_As_Root_Repository(this.__dao_container);
    private readonly __change_root_repository : IChange_Root_Repository = new Change_Root_Repository(this.__dao_container, this.__dao_flow);
    private readonly __get_flows_repository : Get_Flows_Repository = new Get_Flows_Repository(this.__dao_flow);

    private readonly __zoom_handler : IZoom_Handeler = new Zoom_Handeler(this.__zoom_repository);
    private readonly __view_as_root_handler : IView_As_Root_Handler = new View_As_Root_Handler();
    private readonly __node_linker_handler : INode_Linker = new Node_Linker();

    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository, this.__node_linker_handler,this.__zoom_handler);
    private readonly __move_container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_repository, this.__zoom_handler);
    private readonly __delete_container_use_case = new Delete_Container_Use_case(this.__delete_repository, this.__node_linker_handler);
    private readonly __move_view_use_case = new Move_View_Use_case(this.__move_view_repository);
    private readonly __view_as_root_use_case = new View_As_Root_Use_case(this.__view_as_root_repository, this.__view_as_root_handler);
    private readonly __paginate_use_case = new Paginate_Use_case(this.__paginate_repository, this.__view_as_root_repository, this.__view_as_root_handler);
    private readonly __view_paginate_use_case = new View_Paginate_Use_case(this.__paginate_repository, this.__view_as_root_repository, this.__view_as_root_handler);
    private readonly __move_ligature_use_case = new Move_Ligature_Use_case(this.__node_linker_handler);
    private readonly __mark_as_root_use_case = new Mark_As_Root_Use_case(this.__mark_as_root_repository);
    private readonly __change_root_use_case = new Change_Root_Use_case(this.__change_root_repository, this.__view_as_root_repository, this.__view_as_root_handler);
    private readonly __get_flows_use_case = new Get_Flows_Use_case(this.__get_flows_repository);


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

    public execute_paginate(request : Paginate_Request) : Paginate_Response
    {
        return this.__paginate_use_case.handle(request);
    }

    public execute_view_paginate(request : View_Paginate_Request) : View_Paginate_Response
    {
        return this.__view_paginate_use_case.handle(request);
    }

    public execute_move_ligature(request : Move_ligature_Request) : void
    {        
        this.__move_ligature_use_case.handle_move_ligature(request);
    }

    public execute_assign_ligature(request : Assign_Ligature_Request) : void
    {
        this.__move_ligature_use_case.handle_assign_ligature_to_container(request);
    }

    public execute_mark_as_root(request : Mark_As_Root_Request) : Mark_As_Root_Response
    {
        return this.__mark_as_root_use_case.handle(request);
    }

    public execute_change_root(request : Change_Root_Request) : Change_Root_Response
    {
        return this.__change_root_use_case.handle(request);
    }

    public execute_get_flows() : Get_Flows_Response
    {
        return this.__get_flows_use_case.handle();
    }
}