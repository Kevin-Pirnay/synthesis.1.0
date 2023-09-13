import { Class_Handler } from "./Class";
import { Attribute_Handler } from "./Attribute";


export class Handler
{
    public readonly class  : Class_Handler;
    public readonly attribute : Attribute_Handler

    constructor()
    {
        this.class = new Class_Handler();
        this.attribute = new Attribute_Handler
    }
}