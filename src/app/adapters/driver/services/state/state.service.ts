import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { PipelineService } from '../pipeline/pipeline.service';
import { From_Aside } from './From_Aside/From_Aside';
import { From_Svg } from './From_Svg/From_Svg';
import { Fom_Navigation } from './Fom_Navigation/Fom_Navigation';


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


