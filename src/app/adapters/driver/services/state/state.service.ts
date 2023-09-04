import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { PipelineService } from '../pipeline/pipeline.service';
import { From_Aside } from './From_Aside';
import { From_Svg } from './From_Svg';


@Injectable({
providedIn: 'root'
})

export class StateService
{
    public readonly from_aside : From_Aside;
    public readonly from_svg : From_Svg;

    constructor(data : DataService, pipeline : PipelineService) 
    { 
        this.from_aside = new From_Aside(data, pipeline);
        this.from_svg = new From_Svg(data, pipeline);
    }
}
