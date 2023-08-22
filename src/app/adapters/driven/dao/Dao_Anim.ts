import { race } from "rxjs";
import { Vector } from "../../../core/common/Vector/Vector";
import { Vector_ } from "../../../core/common/Vector/Vector_";
import { IDao_Anim } from "../../../core/port/driven/dao/IDao_Anim";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";


export class Dao_Anim implements IDao_Anim
{
    private readonly __center_choose_root_anim : Vector<3> = Vector_.new([500, 500, 0]);

    constructor(private readonly __runtime_persistence : Runtime_Persistence) 
    {         
    }

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
        return Vector_.new([250, 0, 0]);
    }

    public get_center_rotation_choose_roots_anim(): Vector<3> 
    {
        return Vector_.new([1 / 2 * 500, 500, 0]);
    }

    public get_rate_choose_roots_anim(): number 
    {
        return 0.8;
    }

    public get_zoom_center_point_choose_roots_anim(): Vector<3> 
    {
        return this.__center_choose_root_anim;
    }
}