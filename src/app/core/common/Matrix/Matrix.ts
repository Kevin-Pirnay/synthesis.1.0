import { Vector } from "../Vector/Vector";
import { Matrix_ } from "./Matrix_";

export class Matrix<T>
{
    public readonly __ = new Matrix_(this);
    public readonly _ : Vector<any>[] = [];

    constructor(vectors : Vector<any>[] = [])
    {
        for (let i = 0; i < vectors.length; i++)
        {
            this._[i] = vectors[i];
        }
    }
}