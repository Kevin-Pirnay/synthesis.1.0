import { Vector } from "../../../common/Vector/Vector";

export interface IDao_Anim
{
    get_zoom_center_point_choose_roots_anim(): Vector<3>;
    get_center_zoom_point(): Vector<3>;
    get_rate_choose_roots_anim(): number;
    get_center_rotation_choose_roots_anim(): Vector<3>;
    get_axe_rotation_choose_roots_anim(): Vector<3>;
    get_ratio_choose_roots_anim(): number;
    get_coordinates_choose_roots_anim(): Vector<3>;
    
}