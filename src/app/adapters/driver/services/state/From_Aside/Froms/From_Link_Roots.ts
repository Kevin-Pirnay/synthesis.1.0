import { PipelineService } from '../pipeline/pipeline.service';

export class From_Link_Roots {
    constructor(
        private readonly __pipeline: PipelineService
    ) { }

    public report_click_on_next_link_roots(): void {
        this.__pipeline.request_view_links_roots(1);
    }

    public report_click_on_previous_link_root(): void {
        this.__pipeline.request_view_links_roots(-1);
    }

    public report_click_on_back_link_roots(): void {
        this.__pipeline.request_back_view(null);
    }
}
