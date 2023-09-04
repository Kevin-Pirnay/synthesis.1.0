import { DataService } from '../data/data.service';
import { PipelineService } from '../pipeline/pipeline.service';


export class From_Aside 
{
    public readonly base: From_Base;
    public readonly back_view: From_Back_View;
    public readonly choose_root: From_Choose_Root;
    public readonly menu: From_Menu;
    public readonly link_roots: From_Link_Roots;
    public readonly paginate: From_Paginate;

    constructor(data: DataService, pipeline: PipelineService) 
    {
        this.base = new From_Base(data);
        this.back_view = new From_Back_View(pipeline);
        this.choose_root = new From_Choose_Root(pipeline);
        this.menu = new From_Menu(data, pipeline);
        this.link_roots = new From_Link_Roots(pipeline);
        this.paginate = new From_Paginate(pipeline);
    }
}

class From_Base
{
    constructor(
        private readonly __data : DataService, 
    ) { }

    public report_click_on_show_menu() : void
    {
        this.__data.set_show_menu(true);
    }

    public report_click_on_show_back_view() : void
    {
        this.__data.set_show_back_view(true);
    }

    public report_click_on_show_choose_root() : void
    {
        this.__data.set_show_choose_root(true);
    }

    public report_click_on_show_paginate() : void
    {
        this.__data.set_show_paginate(true);
    }

    public report_click_on_show_link_roots() : void
    {
        this.__data.set_show_link_roots(true);
    }
}

class From_Menu
{
    constructor(
        private readonly __data : DataService, 
        private readonly __pipeline : PipelineService
    ) { }

    public report_click_on_mark_as_root() : void 
    {
        if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_mark_as_root(this.__data.container_on_focus());
    }

    public report_click_on_view_as_root() : void 
    {
        if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_view_as_root(this.__data.container_on_focus());
    }

    public report_click_on_delete_container() : void 
    {
        if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_delete_container(this.__data.container_on_focus());
    }

    public report_click_on_choose_root() : void
    {
        if ( this.__data.is_there_a_container_on_focus() )
        {
            this.__pipeline.request_init_choose_root(this.__data.container_on_focus());

            this.__data.set_show_choose_root(true);
        } 
    }

    public report_click_on_paginate() : void
    {
        if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_init_paginate(this.__data.container_on_focus());
    }

    report_click_on_link_roots() : void
    {
        if ( this.__data.is_there_a_container_on_focus() ) this.__pipeline.request_init_link_roots(this.__data.container_on_focus());

        this.__data.set_is_linking_roots(true);
    }
}

class From_Back_View
{
    constructor(
        private readonly __pipeline : PipelineService
    ) { }

    public report_click_on_back_view(container_id: string) : void
    {
        this.__pipeline.request_back_view(container_id);
    }

    public report_click_on_back_view_root() : void 
    {
        this.__pipeline.request_back_view(null);
    }
}

class From_Choose_Root
{
    constructor(
        private readonly __pipeline : PipelineService
    ) { }

    public report_click_on_back_choose_roots() : void
    {
        this.__pipeline.request_back_view(null);
    }
    
    public report_click_on_previous_choose_root() : void
    {
        this.__pipeline.request_view_choose_root(-1);
    }
    
    public report_click_on_next_choose_roots() : void
    {
        this.__pipeline.request_view_choose_root(1)
    }
}

class From_Link_Roots
{
    constructor(
        private readonly __pipeline : PipelineService
    ) { }

    public report_click_on_next_link_roots() : void
    {
        this.__pipeline.request_view_links_roots(1);
    }

    public report_click_on_previous_link_root() : void
    {
        this.__pipeline.request_view_links_roots(-1);
    }

    public report_click_on_back_link_roots() : void
    {
        this.__pipeline.request_back_view(null);
    }
}
 
class From_Paginate
{
    constructor(
        private readonly __pipeline : PipelineService
    ) { }

    public report_clik_on_previous_paginate() : void
    {
        this.__pipeline.request_view_paginate(-1);
    }
    
    public report_clik_on_next_paginate() : void
    {
        this.__pipeline.request_view_paginate(1);
    }
    
    public report_clik_on_back_paginate() : void
    {
        this.__pipeline.request_back_view(null);
    }
}

