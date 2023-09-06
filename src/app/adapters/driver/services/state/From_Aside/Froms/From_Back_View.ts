import { PipelineService } from '../pipeline/pipeline.service';

export class From_Back_View {
    constructor(
        private readonly __pipeline: PipelineService
    ) { }

    public report_click_on_back_view(container_id: string): void {
        this.__pipeline.request_back_view(container_id);
    }

    public report_click_on_back_view_root(): void {
        this.__pipeline.request_back_view(null);
    }
}
