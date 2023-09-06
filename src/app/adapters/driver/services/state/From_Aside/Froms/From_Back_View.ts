import { Aside__Stack_Roots_Ids_ } from "../../../data/aside/dao/Aside__Stack_Roots_Ids_";
import { DataService } from "../../../data/data.service";
import { PipelineService } from "../../../pipeline/pipeline.service";

export class From_Back_View 
{
    private readonly __data_stack_roots : Aside__Stack_Roots_Ids_;

    constructor(data: DataService, private readonly __pipeline: PipelineService) 
    { 
        this.__data_stack_roots = data.aside.__.stack_roots_ids;
    }

    public report_click_on_back_view(container_id: string): void 
    {
        this.__pipeline.request_back_view(container_id);
    }

    public report_click_on_back_view_root(): void 
    {
        this.__pipeline.request_back_view(null);

        this.__data_stack_roots.reset_the_stack_roots_ids();
    }
}
