import { Navigation_Zoom_ } from "./dao/Navigation_Zoom_";
import { Navigation_Memory } from "./memory/Navigation_Memory";

export class Navigation
{
    private readonly __memory : Navigation_Memory;

    public readonly __ : Navigation_;

    constructor()
    {
        this.__memory = new Navigation_Memory();

        this.__ = new Navigation_(this.__memory);
    }
}

class Navigation_
{
    public readonly zoom : Navigation_Zoom_;

    constructor(memory : Navigation_Memory) { }
}