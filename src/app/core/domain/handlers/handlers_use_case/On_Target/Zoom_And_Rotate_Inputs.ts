import { Vector } from "../../../../common/Vector/Vector";
import { IZoom_Handler } from "../Zoom/IZoom_Handler";
import { IData_Tree } from "../View_As_Root/IData_Tree";



export class Zoom_And_Rotate_Inputs {
    constructor(
        public readonly data: IData_Tree[],
        public readonly delta_level: number,
        public readonly axe_rotation: Vector<3>,
        public readonly center_rotation: Vector<3>,
        public readonly max_angle: number,
        public readonly phase: number,
        public readonly direction: number,
        public readonly zoom_handler: IZoom_Handler
    ) { }
}
