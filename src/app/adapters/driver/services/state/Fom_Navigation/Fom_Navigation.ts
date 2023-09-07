import { DataService } from '../../data/data.service';
import { PipelineService } from '../../pipeline/pipeline.service';
import { From_Zoom } from './Froms/From_Zoom';
import { From_Navigator } from './Froms/From_Navigator';

export class Fom_Navigation 
{
    public readonly navigator: From_Navigator;
    public readonly zoom: From_Zoom;

    constructor(data: DataService, pipeline: PipelineService) 
    {
        this.navigator = new From_Navigator(data, pipeline);
        this.zoom = new From_Zoom(data, pipeline);
    }
}
