import { Navigation_Zoom_ } from "./dao/Navigation_Zoom_";
import { Navigation_Memory } from "./memory/Navigation_Memory";

export class Navigation_ {
    public readonly zoom: Navigation_Zoom_;

    constructor(memory: Navigation_Memory) {
        this.zoom = new Navigation_Zoom_(memory);
    }
}
