import { PipelineService } from "../../../pipeline/pipeline.service";

export class From_Paginate 
{
    constructor(
        private readonly __pipeline: PipelineService
    ) { }

    public report_clik_on_previous_paginate(): void 
    {
        this.__pipeline.request_view_paginate(-1);
    }

    public report_clik_on_next_paginate(): void 
    {
        this.__pipeline.request_view_paginate(1);
    }

    public report_clik_on_back_paginate(): void 
    {
        this.__pipeline.request_back_view(null);
    }
}
