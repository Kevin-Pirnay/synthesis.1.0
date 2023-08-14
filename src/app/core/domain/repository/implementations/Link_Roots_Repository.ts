import { Indexes } from './../../handlers/Indexes/Indexes';
import { IDao_Flow } from './../../../port/driven/dao/IDao_Flow';
import { IDto } from "../../../port/driver/dto/IDto";
import { Container } from "../../entities/Container";
import { ILink_Roots } from "../../use_cases/Link/Init_Link_Roots";
import { ILink_Roots_Repository } from "../interfaces/ILink_Roots_Repository";
import { IMove_View_Handler } from '../../handlers/Move_View/IMove_View_Handler';
import { IZoom_Handeler } from '../../handlers/Zoom/IZoom_Handeler';
import { IChange_Root_Handler } from '../../handlers/Change_Root/IChange_Root_Handler';
import { Matrix_ } from '../../../common/Matrix/Matrix_';
import { Vector_ } from '../../../common/Vector/Vector_';
import { Vector } from '../../../common/Vector/Vector';
import { Matrix } from '../../../common/Matrix/Matrix';


export class Link_Roots_Repository implements ILink_Roots_Repository
{
    private __current_flow : string = "";
    private __flows : string[] = [];
    private readonly __indexes = new Indexes();

    constructor(
        private readonly __flow_dao : IDao_Flow, 
        private readonly __change_root_handler : IChange_Root_Handler,
        private readonly __zoom_handler : IZoom_Handeler, 
        private readonly __move_view_handler : IMove_View_Handler
    ) { }

    public link_roots(container: Container): Container 
    {
        throw new Error("Method not implemented.");
    }

    public get_next_indexes(direction: number): number[] 
    {
        return this.__indexes.get_next_indexes(direction);
    }
    
    public get_link_roots_data(indexes: number[]): ILink_Roots 
    {
        return new Link_Roots(this.__flows, indexes, this.__change_root_handler, this.__zoom_handler, this.__move_view_handler);
    }

    public init_indexes(): number 
    {
        return this.__indexes.init_indexes(this.__flows.length);
    }

    public store_all_subtrees_root(): void 
    {
        this.__flow_dao.get_all_flows().forEach(flow => this.__flows.push(flow));
    }

    public links_roots(container: Container): IDto[] 
    {
        throw new Error('Method not implemented.');
    }
}

class Link_Roots implements ILink_Roots
{
    private readonly __projects : IProjects;

    constructor(
        flows : string[],
        indexes: number[],
        change_root_handler : IChange_Root_Handler,
        zoom_handler : IZoom_Handeler, 
        move_view_handler : IMove_View_Handler
    ) 
    { 
        const project1 : IDto[] = change_root_handler.get_subtree_from_the_flow(flows[indexes[0]]);
        const project2 : IDto[] = change_root_handler.get_subtree_from_the_flow(flows[indexes[1]]);

        this.__projects = new Projects(project1, project2, zoom_handler, move_view_handler);
    }

    public anim(): IDto[] 
    {
        this.__projects.anim_current_project();
        this.__projects.anim_next_project();
        return this.__projects.get_dtos();
    }
}

interface IProjects
{
    anim_next_project(): unknown;
    anim_current_project(): unknown;
    get_dtos(): IDto[];
}

class Projects implements IProjects
{
    private __current : IProject;
    private __next : IProject;

    constructor(dtos1 : IDto[], dtos2 : IDto[], zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler) 
    { 
        this.__current = new Project(dtos1, zoom_handler, move_view_handler);
        this.__next = new Project(dtos2, zoom_handler, move_view_handler);
    }

    public anim_current_project(): void 
    {
        this.__current.unzoom();
        this.__current.rotate_out();
    }

    public anim_next_project(): void 
    {
        this.__next.rotate_in();
        this.__next.zoom();
    }

    public get_dtos(): IDto[] 
    {
        throw new Error('Method not implemented.');
    }
}

interface IProject
{
    rotate_in(): void;
    rotate_out(): void;
    zoom(): void;
    unzoom(): void;
}

class Project implements IProject
{
    private readonly __zoom_project : IZoom_Project;
    private readonly __rotate_project : IRotate_Project;

    constructor(dtos : IDto[], zoom_handler : IZoom_Handeler, move_view_handler : IMove_View_Handler) 
    { 
        this.__zoom_project = new Zoom_Project(dtos, zoom_handler);
        this.__rotate_project = new Rotate_Project(dtos, move_view_handler);
    }

    public rotate_in(): void 
    {
        const params_start = Matrix_.new([Vector_.new([0, 0, 250]), Vector_.zero()]);
        const params_result = Matrix_.new([Vector_.new([250, 250, 0]), Vector_.new([1, 1, 1])]);
        this.__rotate_project.rotate(params_start, params_result, 90, 0.8, 1);
    }

    public rotate_out(): void 
    {
        const params_start = Matrix_.new([Vector_.new([0, 0, 250]), Vector_.zero()]);
        const params_result = Matrix_.new([Vector_.new([250, 250, 0]), Vector_.new([1, 1, 1])]);
        this.__rotate_project.rotate(params_start, params_result, 90, 0.8, 1);
    }

    public zoom(): void 
    {
        this.__zoom_project.zoom(1.5);
    }

    public unzoom(): void 
    {
        this.__zoom_project.zoom(0.5);
    }
}

interface IZoom_Project
{
    zoom(zoom_factor: number): void;
}

interface IRotate_Project
{
    rotate(params_start: Matrix<2>, params_result: Matrix<2>, max_angle : number, rate: number, direction: number): void;
}

class Zoom_Project implements IZoom_Project
{
    constructor(private readonly __dtos : IDto[], private readonly __zoom_handler : IZoom_Handeler) { }

    public zoom(zoom_factor: number): void 
    {
        this.__zoom_handler.zoom_by_factor(zoom_factor, this.__dtos);
    }
}

class Rotate_Project implements IRotate_Project
{
    constructor(private readonly __dtos : IDto[], private readonly __move_view_handler : IMove_View_Handler) { }

    public rotate(params_start: Matrix<2>, params_result: Matrix<2>, max_angle : number, rate: number, direction: number): void 
    {
        this.__move_view_handler.rotate_project(this.__dtos, params_start, params_result, max_angle, rate, direction);
    }
}