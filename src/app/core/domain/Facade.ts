import { Move_View_Repository } from './repository/implementations/Move_View_Repository';
import { Delete_Container_Repository } from './repository/implementations/Delete_Repository';
import { Create_Repository } from './repository/implementations/Create_Repository';
import { Dao_Ligature } from './../../adapters/driven/dao/Dao_Ligature';
import { Dao_Container } from './../../adapters/driven/dao/Dao_Container';
import { Runtime_Persistence } from './../../adapters/driven/runtime_memory/Runtime_Persistence';
import { Flow } from './entities/Flow';
import { IDao_Container } from "../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../port/driven/dao/IDao_Ligature";
import { Create_Container_Request, Delete_Container_Request, Move_Container_Request, Move_ligature_Request, Assign_Ligature_Request, Zoom_Request, Move_View_Request, Mark_As_Root_Request, View_As_Root_Request, Paginate_Request, View_Paginate_Request, Choose_Root_Request, Choosen_Root_Request, View_Choose_Root_Request } from "../port/driver/request/request";
import { Choose_Root_Response, Choosen_Root_Response, Create_Container_Response, Delete_Container_Response, Mark_As_Root_Response, Paginate_Response, View_As_Root_Response, View_Choose_Root_Response, View_Paginate_Response } from "../port/driver/response/Response";
import { INode_Linker } from "./handlers/handlers_use_case/Link_Node/INode_Linker";
import { Node_Linker } from "./handlers/handlers_use_case/Link_Node/Node_Linker";
import { IMove_View_Handler } from "./handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { Move_View_Handler } from "./handlers/handlers_use_case/Move_View/Move_View_Handler";
import { IChange_Root_Repository, IChoose_Root_Repository, ICreate_Repository, IDelete_Container_Repository, IMark_As_Root_Repository, IMove_View_Repository, IPaginate_Repository, IView_As_Root_Repository, IZoom_Repository } from "./repository/interfaces/IRepository";
import { Create_Container_Use_case } from "./use_cases/Create_Container";
import { Delete_Container_Use_case } from "./use_cases/Delete_Container";
import { Move_Container_Use_case } from "./use_cases/Move_Container";
import { Move_Ligature_Use_case } from "./use_cases/Move_Ligature";
import { Move_View_Use_case } from "./use_cases/Move_View";
import { Zoom_Use_case } from "./use_cases/Zoom";
import { Zoom_Repository } from './repository/implementations/Zoom_Repository';
import { IZoom_Handler } from './handlers/handlers_use_case/Zoom/IZoom_Handler';
import { Zoom_Handler } from './handlers/handlers_use_case/Zoom/Zoom_Handler';
import { View_As_Root_Use_case } from './use_cases/View_As_Root';
import { View_As_Root_Repository } from './repository/implementations/View_As_Root_Repository';
import { IView_As_Root_Handler } from './handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler';
import { View_As_Root_Handler } from './handlers/handlers_use_case/View_As_Root/View_As_Root_Handler';
import { Mark_As_Root_Use_case } from './use_cases/Mark_As_Root';
import { Mark_As_Root_Repository } from './repository/implementations/Mark_As_Root_Repository';
import { Paginate_Repository } from './repository/implementations/Paginate_Repository';
import { Init_Paginate_Use_case } from './use_cases/Paginate/Init_Paginate';
import { View_Paginate_Use_case } from './use_cases/Paginate/View_Paginate';
import { Init_Choose_Root_Use_case } from './use_cases/Choose_Root/Init_Choose_Root';
import { Choose_Root_Repository } from './repository/implementations/Choose_Root_Repository';
import { View_Choose_Root_Use_case } from './use_cases/Choose_Root/View_Choose_Root';
import { Chosen_Root_Use_case } from './use_cases/Choose_Root/Chosen_Root';
import { Change_Root_Handler } from './handlers/handlers_use_case/Change_Root/Change_Root_Handler';
import { IChange_Root_Handler } from './handlers/handlers_use_case/Change_Root/IChange_Root_Handler';
import { Change_Root_Repository } from './repository/implementations/Change_Root_Repository';
import { Dao_Flow } from '../../adapters/driven/dao/Dao_Flow';
import { IDao_Flow } from '../port/driven/dao/IDao_Flow';
import { IDto } from '../port/driver/dto/IDto';
import { Rotate_On_Target } from './handlers/handlers_use_case/On_Target/Rotate_On_Target';


export class Facade
{
    private readonly __flow = new Flow();
    private readonly __runtime_persistence = new Runtime_Persistence(this.__flow);

    private readonly __dao_container : IDao_Container = new Dao_Container(this.__runtime_persistence, this.__flow);
    private readonly __dao_ligature : IDao_Ligature = new Dao_Ligature(this.__runtime_persistence, this.__flow);
    private readonly __dao_flow : IDao_Flow = new Dao_Flow(this.__runtime_persistence, this.__flow);

    private readonly __create_repository : ICreate_Repository = new Create_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __zoom_repository : IZoom_Repository = new Zoom_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __delete_repository : IDelete_Container_Repository = new Delete_Container_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __move_view_repository : IMove_View_Repository = new Move_View_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __view_as_root_repository : IView_As_Root_Repository = new View_As_Root_Repository(this.__dao_container);
    private readonly __mark_as_root_repository : IMark_As_Root_Repository = new Mark_As_Root_Repository(this.__dao_container);
    private readonly __paginate_repository : IPaginate_Repository = new Paginate_Repository();
    private readonly __choose_roots_repository : IChoose_Root_Repository = new Choose_Root_Repository();
    private readonly __change_root_repository : IChange_Root_Repository = new Change_Root_Repository(this.__dao_container, this.__dao_ligature, this.__dao_flow);

    private readonly __zoom_handler : IZoom_Handler = new Zoom_Handler(this.__zoom_repository);
    private readonly __node_linker_handler : INode_Linker = new Node_Linker();
    private readonly __move_view_handler : IMove_View_Handler = new Move_View_Handler(this.__move_view_repository);
    private readonly __view_as_root_handler : IView_As_Root_Handler = new View_As_Root_Handler(this.__view_as_root_repository);
    private readonly __change_root_handler : IChange_Root_Handler = new Change_Root_Handler(this.__change_root_repository, this.__view_as_root_handler)

    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository, this.__node_linker_handler,this.__zoom_handler);
    private readonly __move_container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_handler);
    private readonly __delete_container_use_case = new Delete_Container_Use_case(this.__delete_repository, this.__node_linker_handler);
    private readonly __move_view_use_case = new Move_View_Use_case(this.__move_view_handler);
    private readonly __move_ligature_use_case = new Move_Ligature_Use_case(this.__node_linker_handler);
    private readonly __view_as_root_use_case = new View_As_Root_Use_case(this.__view_as_root_handler);
    private readonly __mark_as_root_use_case = new Mark_As_Root_Use_case(this.__mark_as_root_repository);
    private readonly __paginate_use_case = new Init_Paginate_Use_case(this.__paginate_repository, this.__view_as_root_repository, this.__view_as_root_handler);
    private readonly __view_paginate_use_case = new View_Paginate_Use_case(this.__paginate_repository, this.__view_as_root_handler);
    private readonly __init_choose_roots_use_case = new Init_Choose_Root_Use_case(this.__choose_roots_repository, this.__zoom_handler, this.__move_view_handler);
    private readonly __view_choose_roots_use_case = new View_Choose_Root_Use_case(this.__choose_roots_repository);
    private readonly __chosen_root_use_case = new Chosen_Root_Use_case(this.__change_root_handler);


    public execute_create_container(request : Create_Container_Request) : Create_Container_Response
    {
        return this.__create_container_use_case.handle(request);
    }

    public execute_delete_container(request : Delete_Container_Request) : Delete_Container_Response
    {
        return this.__delete_container_use_case.handle(request);
    }

    public execute_move_container(request : Move_Container_Request) : void
    {
        this.__move_container_Use_case.handle(request);
    }

    public execute_move_ligature(request : Move_ligature_Request) : void
    {        
        this.__move_ligature_use_case.handle_move_ligature(request);
    }

    public execute_assign_ligature(request : Assign_Ligature_Request) : void
    {
        this.__move_ligature_use_case.handle_assign_ligature_to_container(request);
    }

    public execute_zoom(request :Zoom_Request) : void
    {
        this.__zoom_use_case.handle_zoom(request);
    }

    public execute_stop_zoom() : void
    {
        this.__zoom_use_case.handle_stop_zoom();
    }

    public execute_move_view(request : Move_View_Request) : void
    {
        this.__move_view_use_case.handle_request_move_view(request);
    } 

    public execute_stop_move_view() : void
    {
        this.__move_view_use_case.handle_request_stop_move_view();
    } 

    public execute_view_as_root(request : View_As_Root_Request) : View_As_Root_Response
    {
        return this.__view_as_root_use_case.handle(request);
    }

    public execute_mark_as_root(request : Mark_As_Root_Request) : Mark_As_Root_Response
    {
        return this.__mark_as_root_use_case.handle(request);
    }

    public execute_init_paginate(request : Paginate_Request) : Paginate_Response
    {
        return this.__paginate_use_case.handle(request);
    }

    public execute_view_paginate(request : View_Paginate_Request) : View_Paginate_Response
    {
        return this.__view_paginate_use_case.handle(request);
    }

    public execute_init_choose_roots(request : Choose_Root_Request) : Choose_Root_Response
    {
        return this.__init_choose_roots_use_case.handle(request);
    }

    public execute_view_choose_roots(request : View_Choose_Root_Request) : View_Choose_Root_Response
    {
        return this.__view_choose_roots_use_case.handle(request);
    }

    public execute_chosen_root(request : Choosen_Root_Request) : Choosen_Root_Response
    {
        return this.__chosen_root_use_case.handle(request);
    }

    public rotate_data(dtos :IDto[])
    {
        new Rotate_On_Target(dtos, this.__zoom_handler).zoom_and_rotate();
    }
}