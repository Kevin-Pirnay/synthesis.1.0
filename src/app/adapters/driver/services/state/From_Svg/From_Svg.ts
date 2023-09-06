import { DataService } from '../../data/data.service';
import { PipelineService } from '../../pipeline/pipeline.service';
import { From_Mouse } from './From_Mouse';
import { From_Key } from './Froms/From_Key';


export class From_Svg 
{
    public readonly mouse : From_Mouse;
    public readonly key : From_Key;

    constructor(data: DataService, pipeline: PipelineService) 
    { 
        this.mouse = new From_Mouse(data,pipeline);
        this.key = new From_Key(data, pipeline);
    }
}


