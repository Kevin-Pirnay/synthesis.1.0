import { Vector } from "../Vector/Vector";
import { Matrix_ } from "./Matrix_";

export class Matrix<T>
{
    public readonly __ = new Matrix_(this);
    public readonly _ : Vector[] = [];

    constructor(vectors : Vector[] = [])
    {
        for (let i = 0; i < vectors.length; i++)
        {
            this._[i] = vectors[i];
        }
    }
}