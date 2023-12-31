import { Rotate_On_Target } from '../../../handlers/handlers_use_case/On_Target/Rotate_On_Target';
import { Zoom_And_Rotate_Inputs } from "../../../handlers/handlers_use_case/On_Target/Zoom_And_Rotate_Inputs";
import { Vector } from "../../../../common/Vector/Vector";
import { IDto } from "../../../../port/driver/dto/IDto";
import { IChange_Flow_Handler } from "../../../handlers/handlers_use_case/Change_Root/IChange_Flow_Handler";
import { IData_Tree } from "../../../handlers/handlers_use_case/View_As_Root/IData_Tree";
import { IZoom_Handler } from "../../../handlers/handlers_use_case/Zoom/IZoom_Handler";
import { ILink_Roots } from "../../../use_cases/Link_Root/Init_Link_Roots";
import { Observer } from '../../../../common/Observer/Observer';


export class Inputs_Init_Link_Root_Anim 
{
    constructor(
        public readonly delta_level: number,
        public readonly axe_rotation: Vector<3>,
        public readonly max_angle: number,
        public readonly center_rotation: Vector<3>,
        public readonly phase: number,
        public readonly direction: number
    ) { }
}

export class Link_Roots implements ILink_Roots 
{
    private readonly __current: ILink_Flow;
    private readonly __next: ILink_Flow;

    constructor(flows: string[], inputs_current: Inputs_Init_Link_Root_Anim, inputs_next: Inputs_Init_Link_Root_Anim, change_flow_handler: IChange_Flow_Handler, zoom_handler: IZoom_Handler) 
    {
        this.__current = new Link_Root(flows[0], inputs_current, change_flow_handler, zoom_handler);

        this.__next = new Link_Root(flows[1], inputs_next, change_flow_handler, zoom_handler);
    }

    public async anim(observer: Observer<IDto[]>): Promise<void> 
    {
        this.__current.init(observer);
        await this.__current.rotate_and_zoom();

        this.__next.init(observer);
        await this.__next.rotate_and_zoom();
    }
}

interface ILink_Flow 
{
    rotate_and_zoom(): Promise<void>;
    init(observer: Observer<IDto[]>): void;
}


class Link_Root implements ILink_Flow 
{
    private __inputs__: Zoom_And_Rotate_Inputs | null = null;
    private __original_zoom_factor : number = 0;

    constructor(
        private readonly __flow: string,
        private readonly __inputs: Inputs_Init_Link_Root_Anim,
        private readonly __change_flow_handler: IChange_Flow_Handler,
        private readonly __zoom_handler: IZoom_Handler
    ) 
    { 
        this.__original_zoom_factor = __zoom_handler.get_current_zoom_fator();
    }

    public init(observer: Observer<IDto[]>): void 
    {
        const data: IData_Tree[] = this.__change_flow_handler.change_flow_and_get_subtree_from_the_root(this.__flow);        

        this.__inputs__ = new Zoom_And_Rotate_Inputs(
            data,
            this.__inputs.delta_level,
            this.__inputs.axe_rotation,
            this.__inputs.center_rotation,
            this.__inputs.max_angle,
            this.__inputs.phase,
            this.__inputs.direction,
            this.__zoom_handler
        );

        observer.send(data);
    }

    public async rotate_and_zoom(): Promise<void> 
    {
        if (!this.__inputs__) throw new Error("No inputs was given");

        const positions = new Rotate_On_Target(this.__inputs__);

        await positions.zoom_and_rotate();

        positions.unzoom_to_the_previous_factor(this.__original_zoom_factor);
    }
}

