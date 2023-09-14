import { Vector } from "../../../core/common/Vector/Vector";
import { Vector_ } from "../../../core/common/Vector/Vector_";
import { IDao_Anim } from "../../../core/port/driven/dao/IDao_Anim";
import { Runtime_Persistence } from "../runtime_memory/Runtime_Persistence";
import { Inputs_Init_Link_Root_Anim } from "../../../core/domain/repository/implementations/injectors/Link_Roots";
import { Matrix } from "../../../core/common/Matrix/Matrix";

//refactor
export type Quad_Callback = (x: number, y : number) => Vector<3>;

export class Dao_Anim implements IDao_Anim
{
    constructor(private readonly __runtime_persistence : Runtime_Persistence) { }

    private readonly __y : number = window.innerHeight * 75/100;
    private readonly __x : number = (window.innerWidth - (window.innerWidth * 25/100))/2;
    private readonly __size_root : number = 40
    
    public get_abs_ratio_choose_root(): Matrix<4> 
    {
        const x =  this.__size_root;

        return new Matrix(
            [
                Vector_.zero(3),
                Vector_.new([x,0,0]),
                Vector_.new([x,x,0]),
                Vector_.new([0,x,0])
            ]
        );
    }

    public get_center_zoom_point(): Vector<3> 
    {
        return new Vector<3>([this.__x, window.innerHeight/2, 0]);
    }

    public get_zoom_center_point_choose_roots_anim(): Vector<3>  
    {
        return Vector_.new([this.__x, this.__y, 0]);
    }

    public get_coordinates_choose_roots_anim(): Vector<3>
    {
        //refactor to be more accurate with the size of the choose_root
        return Vector_.new([this.__x - 33, this.__y, 0]); //this where the container will fall at the end of the animation
    }

    public get_ratio_choose_roots_anim(): number 
    {
        return this.__x * 33/100; //this is the size that the container shall have at the end of the animation
    }

    public get_axe_rotation_choose_roots_anim(): Vector<3> 
    {
        return Vector_.new([window.innerHeight/2 + this.__size_root + 10, 0, 0]);
    }

    public get_center_rotation_choose_roots_anim(): Vector<3> 
    {
        return Vector_.new([this.__x, window.innerHeight + this.__size_root + 5, 0]);
    }

    public get_rate_choose_roots_anim(): number 
    {
        return 0.8;
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

    public get_inputs_init_link_roots_for_next(): Inputs_Init_Link_Root_Anim 
    {        
        const x = 325;
        
        const axe_rotation : Vector<3> = Vector_.new([x, 0, 0]);
        
        const max_angle : number = 90;
        
        const center_rotation : Vector<3> = Vector_.new([(window.innerWidth / 2) - 150, 400, x]);
        
        const phase : number = 3 * Math.PI / 2;
        
        const delta_level : number = +25;
        
        const direction : number = 1;

        return new Inputs_Init_Link_Root_Anim(delta_level, axe_rotation, max_angle, center_rotation, phase, direction);
    }

    public get_inputs_init_link_roots_for_current(): Inputs_Init_Link_Root_Anim 
    {
        const x = 0;
        
        const axe_rotation : Vector<3> = Vector_.new([x, 0, 0]);
        
        const max_angle : number = 90;
        
        const center_rotation : Vector<3> = Vector_.new([-150, 300, x]);
        
        const phase : number =  0;
        
        const delta_level : number = -25;
        
        const direction : number = 1;

        return new Inputs_Init_Link_Root_Anim(delta_level, axe_rotation, max_angle, center_rotation, phase, direction);
    }

    public get_move_view_delta_step(): number 
    {
        return 5;
    }
}