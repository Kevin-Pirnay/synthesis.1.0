import { DataService } from '../../../data/data.service';
import { PipelineService } from '../../../pipeline/pipeline.service';
import { Svg_Current_Event_ } from '../../../data/svg/dao/Svg_Current_Event_';


export class From_Navigator 
{
    private readonly __current_event: Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
    }

    public report_mouse_down_on_arrow_down(): void 
    {
        this.__current_event.set_is_view_moving_down();

        this.__pipeline.request_move_view("down");
    }

    public report_mouse_down_on_arrow_up(): void 
    {
        this.__current_event.set_is_view_moving_up();

        this.__pipeline.request_move_view("up");
    }

    public report_mouse_down_on_arrow_rigth(): void 
    {
        this.__current_event.set_is_view_moving_rigth();

        this.__pipeline.request_move_view("rigth");
    }

    public report_mouse_down_on_arrow_left(): void 
    {
        this.__current_event.set_is_view_moving_left();

        this.__pipeline.request_move_view("left");
    }

    public report_mouse_up(): void 
    {
        if (this.__current_event.is_view_moving()) this.__pipeline.request_stop_moving_view();
        
        this.__current_event.set_current_event_navigation_to_none();
    }
}
