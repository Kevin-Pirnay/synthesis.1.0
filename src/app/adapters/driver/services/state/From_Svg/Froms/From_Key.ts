import { DataService } from '../../../data/data.service';
import { PipelineService } from '../../../pipeline/pipeline.service';
import { Svg_Current_Event_ } from '../../../data/svg/dao/Svg_Current_Event_';

export class From_Key 
{
    private readonly __current_event: Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
    }

    public report_key_up(): void 
    {
        if (this.__current_event.is_zooming()) this.__pipeline.request_stop_zoomimg();
        if (this.__current_event.is_view_moving()) this.__pipeline.request_stop_moving_view();
    }

    public report_key_down(e: KeyboardEvent): void 
    {
        switch (e.key) 
        {
            case '+':
                this.__current_event.set_is_zooming();
                this.__pipeline.request_zoom(1);
                break;
            case '-':
                this.__current_event.set_is_zooming();
                this.__pipeline.request_zoom(-1);
                break;

            //refactor
            case "ArrowLeft":
                this.__current_event.set_is_view_moving_left();
                this.__pipeline.request_move_view(e.key);
                break;

            case "ArrowRight":
                this.__current_event.set_is_view_moving_rigth();
                this.__pipeline.request_move_view(e.key);
                break;

            case "ArrowUp":
                this.__current_event.set_is_view_moving_up();
                this.__pipeline.request_move_view(e.key);
                break;

            case "ArrowDown":
                this.__current_event.set_is_view_moving_down();
                this.__pipeline.request_move_view(e.key);
                break;

            default:
                break;
        }
    }
}