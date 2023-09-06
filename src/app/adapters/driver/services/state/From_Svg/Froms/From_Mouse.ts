import { DataService } from '../../data/data.service';
import { Container } from '../../../../../core/domain/entities/Container';
import { Ligature } from '../../../../../core/domain/entities/Ligature';
import { PipelineService } from '../../pipeline/pipeline.service';
import { Root_Choice } from '../../../../../core/domain/entities/Root_Choice';
import { Svg__Mouse_ } from '../../data/svg/dao/Svg__Mouse_';
import { Svg__Focus_ } from '../../data/svg/dao/Svg__Focus_';
import { Svg_Current_Event_ } from '../../data/svg/dao/Svg_Current_Event_';

export class From_Mouse {
    private readonly __mouse: Svg__Mouse_;
    private readonly __focus: Svg__Focus_;
    private readonly __current_event: Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) {
        this.__mouse = data.svg.__.mouse;
        this.__focus = data.svg.__.focus;
        this.__current_event = data.svg.__.current_event;
    }

    public report_mouse_up(e: MouseEvent): void {
        if (!this.__mouse.is_mouse_down_on_something()) this.__focus.is_there_a_container_on_focus() ? this.__pipeline.request_create_container(e, this.__focus.container_on_focus()) : this.__pipeline.request_create_container(e, null);

        if (this.__mouse.is_mouse_down_on_grip()) this.__pipeline.request_assign_ligature(this.__focus.ligature_on_focus(), this.__focus.get_nullable_container_on_focus());

        this.__mouse.set_mouse_is_up();
    }

    public report_mouse_move(e: MouseEvent): void {
        if (this.__mouse.is_mouse_down_on_container()) this.__pipeline.request_move_container(e, this.__focus.container_on_focus());

        if (this.__mouse.is_mouse_down_on_grip()) this.__pipeline.request_move_ligature(e, this.__focus.ligature_on_focus());
    }

    public report_mouse_down_on_container(container: Container): void {
        if (this.__current_event.is_linking_roots()) {
            this.__pipeline.request_select_links_roots(container);
        }

        else this.__mouse.set_mouse_is_down_on_a_container(container);
    }

    public report_mouse_down_on_ligature(ligature: Ligature): void {
        this.__mouse.set_mouse_is_down_on_a_ligature(ligature);
    }

    public report_mouse_down_on_grip(ligature: Ligature): void {
        this.__mouse.set_mouse_is_down_on_a_grip(ligature);
    }

    public report_mouse_down_on_root_choice(root: Root_Choice): void {
        this.__mouse.set_mouse_is_down_on_a_root_choice();

        this.__pipeline.request_chosen_root(root);
    }

    public report_mouse_over_container(container: Container): void {
        if (this.__mouse.is_mouse_down_on_grip()) this.__focus.set_this_container_on_focus(container);
    }
}
