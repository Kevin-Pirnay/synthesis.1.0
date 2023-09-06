import { From_Paginate } from './From_Paginate';
import { From_Link_Roots } from './From_Link_Roots';
import { From_Choose_Root } from './From_Choose_Root';
import { From_Back_View } from './Froms/From_Back_View';
import { From_Menu } from './From_Menu';
import { DataService } from '../../data/data.service';
import { PipelineService } from '../../pipeline/pipeline.service';


export class From_Aside 
{
    public readonly back_view: From_Back_View;
    public readonly choose_root: From_Choose_Root;
    public readonly menu: From_Menu;
    public readonly link_roots: From_Link_Roots;
    public readonly paginate: From_Paginate;

    constructor(data: DataService, pipeline: PipelineService) 
    {
        this.back_view = new From_Back_View(pipeline);
        this.choose_root = new From_Choose_Root(pipeline);
        this.menu = new From_Menu(data, pipeline);
        this.link_roots = new From_Link_Roots(pipeline);
        this.paginate = new From_Paginate(pipeline);
    }
}
