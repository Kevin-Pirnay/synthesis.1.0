import { Class_Handler } from "./Class";
import { Attribute_Handler } from "./Attribute";
import { Animation_Handler } from "./Animation";


export class Handler
{
    public readonly class  : Class_Handler;
    public readonly attribute : Attribute_Handler;
    public readonly anim : Animation_Handler;

    constructor()
    {
        this.class = new Class_Handler();
        this.attribute = new Attribute_Handler();
        this.anim = new Animation_Handler(this.attribute);
    }
}

