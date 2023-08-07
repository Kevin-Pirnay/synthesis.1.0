import { Facade } from "../../domain/Facade";

export class Pipeline
{
    private static readonly __facade = new Facade();

    public static facade = this.__facade;
}