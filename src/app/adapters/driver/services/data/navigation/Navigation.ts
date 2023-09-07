import { Navigation_ } from "./Navigation_";
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

