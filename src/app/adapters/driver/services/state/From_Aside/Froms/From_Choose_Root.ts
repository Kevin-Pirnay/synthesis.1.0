import { PipelineService } from '../pipeline/pipeline.service';

export class From_Choose_Root {
    constructor(
        private readonly __pipeline: PipelineService
    ) { }

    public report_click_on_back_choose_roots(): void {
        this.__pipeline.request_back_view(null);
    }

    public report_click_on_previous_choose_root(): void {
        this.__pipeline.request_view_choose_root(-1);
    }

    public report_click_on_next_choose_roots(): void {
        this.__pipeline.request_view_choose_root(1);
    }
}
