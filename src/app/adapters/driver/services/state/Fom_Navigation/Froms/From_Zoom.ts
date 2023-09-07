import { DataService } from '../../../data/data.service';
import { PipelineService } from '../../../pipeline/pipeline.service';
import { Svg_Current_Event_ } from '../../../data/svg/dao/Svg_Current_Event_';
import { Navigation_Zoom_ } from '../../../data/navigation/dao/Navigation_Zoom_';


export class From_Zoom 
{
    private readonly __current_svg_event: Svg_Current_Event_;
    private readonly __slider : Navigation_Zoom_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_svg_event = data.svg.__.current_event;
        this.__slider = data.navigation.__.zoom;
    }

    public report_init_slider_view(slider_origin: number, slider_size: number) : void
    {
        this.__slider.init_slider_data(slider_origin, slider_size);
    }

    private __report_moving_cursor_to_the_left() : void
    {
        this.__slider.set_mouse_is_mouving_to_the_left();
        this.__slider.decrement_cursor_position();
        this.__current_svg_event.set_is_zooming_down();
        this.__pipeline.request_zoom(-1);   
        console.log("left");
 
    }
    
    private __report_moving_cursor_to_the_rigth() : void
    {
        this.__slider.set_mouse_is_mouving_to_the_rigth();
        this.__slider.increment_cursor_position();
        this.__current_svg_event.set_is_zooming_up();
        this.__pipeline.request_zoom(1);  
        console.log("rigth");
  
    }

    public report_mouse_move(mouse_x_position : number) : void 
    {
        if ( this.__slider.is_mouse_down_on_cursor() )
        {            
            const cursor_mouse_position : number = this.__slider.get_current_cursor_mouse_position();

            console.log("mouse", mouse_x_position, cursor_mouse_position);
            
    
            if ( mouse_x_position > cursor_mouse_position ) this.__report_moving_cursor_to_the_rigth();
    
            if ( mouse_x_position < cursor_mouse_position ) this.__report_moving_cursor_to_the_left();
        }
    }

    public report_mouse_is_down_on_cursor() : void
    {
        this.__slider.set_mouse_is_down_on_cursor();
    }

    public report_mouse_is_up() : void
    {
        this.__slider.set_mouse_is_up();
        this.__current_svg_event.set_current_event_to_none();
        this.__pipeline.request_stop_zoomimg();
    }
}
