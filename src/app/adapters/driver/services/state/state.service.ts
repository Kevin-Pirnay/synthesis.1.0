import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { PipelineService } from '../pipeline/pipeline.service';
import { From_Aside } from './From_Aside/From_Aside';
import { From_Svg } from './From_Svg/From_Svg';
import { Svg_Current_Event_ } from '../data/svg/dao/Svg_Current_Event_';


@Injectable({
providedIn: 'root'
})

export class StateService
{
    public readonly from_aside : From_Aside;
    public readonly from_svg : From_Svg;
    public readonly from_navigation : Fom_Navigation;

    constructor(data : DataService, pipeline : PipelineService) 
    { 
        this.from_aside = new From_Aside(data, pipeline);
        this.from_svg = new From_Svg(data, pipeline);
        this.from_navigation = new Fom_Navigation(data, pipeline);
    }
}

class Fom_Navigation
{
    public readonly navigator : From_Navigator;
    public readonly zoom : From_Zoom;

    constructor(data: DataService, pipeline: PipelineService)
    {
        this.navigator = new From_Navigator(data, pipeline);
        this.zoom = new From_Zoom(data, pipeline);
    } 
}

class From_Navigator
{
    private readonly __current_event : Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
    }

    public report_mouse_down_on_arrow_down() : void
    {
        this.__current_event.set_is_view_moving_down();
        this.__pipeline.request_move_view("down");    
    }

    public report_mouse_down_on_arrow_up() : void
    {
        this.__current_event.set_is_view_moving_up();
        this.__pipeline.request_move_view("up");    
    }

    public report_mouse_down_on_arrow_rigth() : void
    {
        this.__current_event.set_is_view_moving_rigth();
        this.__pipeline.request_move_view("rigth"); 
    }

    public report_mouse_down_on_arrow_left() : void
    {
        this.__current_event.set_is_view_moving_left();
        this.__pipeline.request_move_view("left"); 
    }

    public report_mouse_up() : void 
    {
        if (this.__current_event.is_view_moving()) this.__pipeline.request_stop_moving_view();
        this.__current_event.set_current_event_to_none();
    }
}

class From_Zoom
{
    private readonly __current_event : Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
    }
}
