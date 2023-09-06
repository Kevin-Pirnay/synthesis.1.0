import { Aside__Current_View_ } from '../../data/aside/dao/Aside__Current_View_';
import { DataService } from '../../data/data.service';
import { PipelineService } from '../../pipeline/pipeline.service';
import { Svg__Focus_ } from '../../data/svg/dao/Svg__Focus_';
import { Svg_Current_Event_ } from '../../data/svg/dao/Svg_Current_Event_';

export class From_Menu 
{
    private readonly __focus: Svg__Focus_;
    private readonly __current_event: Svg_Current_Event_;
    private readonly __current_view: Aside__Current_View_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) {
        this.__focus = data.svg.__.focus;
        this.__current_event = data.svg.__.current_event;
        this.__current_view = data.aside.__.current_view;
    }

    public report_click_on_mark_as_root(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) this.__pipeline.request_mark_as_root(this.__focus.container_on_focus());
    }

    public report_click_on_view_as_root(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) this.__pipeline.request_view_as_root(this.__focus.container_on_focus());
    }

    public report_click_on_delete_container(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) this.__pipeline.request_delete_container(this.__focus.container_on_focus());
    }

    public report_click_on_choose_root(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) 
        {
            this.__pipeline.request_init_choose_root(this.__focus.container_on_focus());

            this.__current_view.set_show_choose_root();
        }
    }

    public report_click_on_paginate(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) this.__pipeline.request_init_paginate(this.__focus.container_on_focus());
    }

    public report_click_on_link_roots(): void 
    {
        if (this.__focus.is_there_a_container_on_focus()) this.__pipeline.request_init_link_roots(this.__focus.container_on_focus());

        this.__current_event.set_is_linking_roots();
    }
}
