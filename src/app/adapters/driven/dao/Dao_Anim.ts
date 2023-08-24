import { race } from "rxjs";
import { Vector } from "../../../core/common/Vector/Vector";
import { Vector_ } from "../../../core/common/Vector/Vector_";
import { IDao_Anim } from "../../../core/port/driven/dao/IDao_Anim";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";
import { Inputs_Init_Link_Root } from "../../../core/domain/repository/implementations/injectors/Link_Roots";

//refactor
export type Quad_Callback = (x: number, y : number) => Vector<3>;

export class Dao_Anim implements IDao_Anim
{
    private readonly __y : number = window.innerHeight * 55/100;

    private readonly __center_choose_root_anim : Vector<3> = Vector_.new([window.innerWidth / 2, this.__y, 0]);

    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    public get_center_zoom_point(): Vector<3> 
    {
        return new Vector<3>([window.innerWidth / 2, window.innerHeight/2, 0]);
    }

    public get_coordinates_choose_roots_anim(): Vector<3> 
    {
        return this.__center_choose_root_anim;
    }

    public get_ratio_choose_roots_anim(): number 
    {
        return 1/5 * 500;
    }

    public get_axe_rotation_choose_roots_anim(): Vector<3> 
    {
        return Vector_.new([window.innerWidth / 2, 0, 0]);
    }

    public get_center_rotation_choose_roots_anim(): Vector<3> 
    {
        return Vector_.new([window.innerWidth / 2, window.innerHeight - 1/5 * this.__y, 0]);
    }

    public get_rate_choose_roots_anim(): number 
    {
        return 0.8;
    }

    public get_zoom_center_point_choose_roots_anim(): Vector<3> 
    {
        return this.__center_choose_root_anim;
    }

    public get_zoom_quad_choose_roots_anim(): Quad_Callback 
    {
        const callback : Quad_Callback = (x : number , y : number) : Vector<3> => { return new Vector([x / 2, y / 2]); }

        return callback;
    }

    public get_move_quad_choose_roots_anim(): Quad_Callback 
    {
        const callback : Quad_Callback = (x : number , y : number) : Vector<3> => { return new Vector([x / 2, (1 / (2*y))]); } //1/y

        return callback;
    }

    get_inputs_init_link_roots_for_next(): Inputs_Init_Link_Root 
    {
        const x = 100;
        
        const axe_rotation : Vector<3> = Vector_.new([x, 0, 0]);
        
        const max_angle : number = 90;
        
        const center_rotation : Vector<3> = Vector_.new([250, 250, x]);
        
        const phase : number = 0;
        
        const delta_level : number = 0;
        
        const direction : number = 1;

        return new Inputs_Init_Link_Root(delta_level, axe_rotation, max_angle, center_rotation, phase, direction);
    }

    get_inputs_init_link_roots_for_current(): Inputs_Init_Link_Root 
    {
        const x = 100;
        
        const axe_rotation : Vector<3> = Vector_.new([x, 0, 0]);
        
        const max_angle : number = 90;
        
        const center_rotation : Vector<3> = Vector_.new([250, 250, x]);
        
        const phase : number =  Math.PI / 2;
        
        const delta_level : number = 0;
        
        const direction : number = 1;

        return new Inputs_Init_Link_Root(delta_level, axe_rotation, max_angle, center_rotation, phase, direction);
    }
}