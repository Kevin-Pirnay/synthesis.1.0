import { DataService } from '../../../data/data.service';
import { PipelineService } from '../../../pipeline/pipeline.service';
import { Svg_Current_Event_ } from '../../../data/svg/dao/Svg_Current_Event_';
import { Navigation_Zoom_ } from '../../../data/navigation/dao/Navigation_Zoom_';

export class From_Key 
{
    private readonly __current_event: Svg_Current_Event_;
    private readonly __slider : Navigation_Zoom_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
        this.__slider = data.navigation.__.zoom;
    }

    public report_key_up(): void 
    {
        if (this.__current_event.is_zooming()) { this.__pipeline.request_stop_zoomimg(); this.__current_event.set_current_event_to_none(); }

        if (this.__current_event.is_view_moving()) { this.__pipeline.request_stop_moving_view(); this.__current_event.set_current_event_to_none(); }
    }

    public report_key_down(e: KeyboardEvent): void 
    {
        switch (e.key) 
        {
            case '+':
                this.__current_event.set_is_zooming_up();
                this.__pipeline.request_zoom(1);
                //this.__pipeline.request_stop_zoomimg();
                this.__slider.increment_cursor_position();
                break;
            case '-':
                this.__current_event.set_is_zooming_down();
                this.__pipeline.request_zoom(-1);
                //this.__pipeline.request_stop_zoomimg();
                this.__slider.decrement_cursor_position();
                break;

            //refactor
            case "ArrowLeft":
                this.__current_event.set_is_view_moving_left();
                this.__pipeline.request_move_view("left");
                break;

            case "ArrowRight":
                this.__current_event.set_is_view_moving_rigth();
                this.__pipeline.request_move_view("rigth");
                break;

            case "ArrowUp":
                this.__current_event.set_is_view_moving_up();
                this.__pipeline.request_move_view("up");
                break;

            case "ArrowDown":
                this.__current_event.set_is_view_moving_down();
                this.__pipeline.request_move_view("down");
                break;

            default:
                break;
        }
    }
}
