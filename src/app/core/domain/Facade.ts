import { Move_View_Repository } from './repository/implementations/Move_View_Repository';
import { Delete_Container_Repository } from './repository/implementations/Delete_Repository';
import { Create_Repository } from './repository/implementations/Create_Repository';
import { Dao_Ligature } from './../../adapters/driven/dao/Dao_Ligature';
import { Dao_Container } from './../../adapters/driven/dao/Dao_Container';
import { Runtime_Persistence } from './../../adapters/driven/runtime_memory/Runtime_Persistence';
import { Flow } from './entities/Flow';
import { IDao_Container } from "../port/driven/dao/IDao_Container";
import { IDao_Ligature } from "../port/driven/dao/IDao_Ligature";
import { Create_Container_Request, Delete_Container_Request, Move_Container_Request, Move_ligature_Request, Assign_Ligature_Request, Zoom_Request, Move_View_Request } from "../port/driver/request/request";
import { Create_Container_Response, Delete_Container_Response } from "../port/driver/response/Response";
import { INode_Linker } from "./handlers/handlers_use_case/Link_Node/INode_Linker";
import { Node_Linker } from "./handlers/handlers_use_case/Link_Node/Node_Linker";
import { IMove_View_Handler } from "./handlers/handlers_use_case/Move_View/IMove_View_Handler";
import { Move_View_Handler } from "./handlers/handlers_use_case/Move_View/Move_View_Handler";
import { IZoom_Handeler } from "./handlers/handlers_use_case/Zoom/IZoom_Handeler";
import { Zoom_Handeler } from "./handlers/handlers_use_case/Zoom/Zoom_Handeler";
import { ICreate_Repository, IDelete_Container_Repository, IMove_View_Repository, IZoom_Repository } from "./repository/interfaces/IRepository";
import { Create_Container_Use_case } from "./use_cases/Create_Container";
import { Delete_Container_Use_case } from "./use_cases/Delete_Container";
import { Move_Container_Use_case } from "./use_cases/Move_Container";
import { Move_Ligature_Use_case } from "./use_cases/Move_Ligature";
import { Move_View_Use_case } from "./use_cases/Move_View";
import { Zoom_Use_case } from "./use_cases/Zoom";
import { Zoom_Repository } from './repository/implementations/Zoom_Repository';


export class Facade
{
    private readonly __flow = new Flow();
    private readonly __runtime_persistence = new Runtime_Persistence(this.__flow);

    private readonly __dao_container : IDao_Container = new Dao_Container(this.__runtime_persistence, this.__flow);
    private readonly __dao_ligature : IDao_Ligature = new Dao_Ligature(this.__runtime_persistence, this.__flow);

    private readonly __create_repository : ICreate_Repository = new Create_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __zoom_repository : IZoom_Repository = new Zoom_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __delete_repository : IDelete_Container_Repository = new Delete_Container_Repository(this.__dao_container, this.__dao_ligature);
    private readonly __move_view_repository : IMove_View_Repository = new Move_View_Repository(this.__dao_container, this.__dao_ligature);
    
    private readonly __zoom_handler : IZoom_Handeler = new Zoom_Handeler(this.__zoom_repository);
    private readonly __node_linker_handler : INode_Linker = new Node_Linker();
    private readonly __move_view_handler : IMove_View_Handler = new Move_View_Handler(this.__move_view_repository);

    private readonly __create_container_use_case = new Create_Container_Use_case(this.__create_repository, this.__node_linker_handler,this.__zoom_handler);
    private readonly __move_container_Use_case = new Move_Container_Use_case();
    private readonly __zoom_use_case = new Zoom_Use_case(this.__zoom_handler);
    private readonly __delete_container_use_case = new Delete_Container_Use_case(this.__delete_repository, this.__node_linker_handler);
    private readonly __move_view_use_case = new Move_View_Use_case(this.__move_view_handler);
    private readonly __move_ligature_use_case = new Move_Ligature_Use_case(this.__node_linker_handler);


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
}