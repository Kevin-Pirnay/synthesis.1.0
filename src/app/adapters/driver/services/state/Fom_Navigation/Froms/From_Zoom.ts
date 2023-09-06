import { DataService } from '../../../data/data.service';
import { PipelineService } from '../../../pipeline/pipeline.service';
import { Svg_Current_Event_ } from '../../../data/svg/dao/Svg_Current_Event_';


export class From_Zoom 
{
    private readonly __current_event: Svg_Current_Event_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    {
        this.__current_event = data.svg.__.current_event;
    }
}
