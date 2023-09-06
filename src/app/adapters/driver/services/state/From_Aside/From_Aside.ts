
import { DataService } from '../../data/data.service';
import { PipelineService } from '../../pipeline/pipeline.service';
import { From_Choose_Root } from './Froms/From_Choose_Root';
import { From_Link_Roots } from './Froms/From_Link_Roots';
import { From_Paginate } from './Froms/From_Paginate';
import { From_Back_View } from './Froms/From_Back_View';
import { From_Menu } from './Froms/From_Menu';



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
