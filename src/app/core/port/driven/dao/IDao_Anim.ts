import { Quad_Callback } from "../../../../adapters/driven/dao/Dao_Anim";
import { Vector } from "../../../common/Vector/Vector";
import { Inputs_Init_Link_Root } from "../../../domain/repository/implementations/injectors/Link_Roots";

export interface IDao_Anim
{
    get_move_view_delta_step(): number;
    get_inputs_init_link_roots_for_next(): Inputs_Init_Link_Root;
    get_inputs_init_link_roots_for_current(): Inputs_Init_Link_Root;
    get_zoom_quad_choose_roots_anim(): Quad_Callback;
    get_move_quad_choose_roots_anim(): Quad_Callback;
    get_zoom_center_point_choose_roots_anim(): Vector<3>;
    get_center_zoom_point(): Vector<3>;
    get_rate_choose_roots_anim(): number;
    get_center_rotation_choose_roots_anim(): Vector<3>;
    get_axe_rotation_choose_roots_anim(): Vector<3>;
    get_ratio_choose_roots_anim(): number;
    get_coordinates_choose_roots_anim(): Vector<3>;
    
}