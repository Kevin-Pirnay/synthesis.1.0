import { Vector_ } from "./Vector_";

export class Vector
{
  public readonly __ = new Vector_(this);
  public readonly _ : number[] = [0,0,0,0];

  constructor(data : number[] = []) 
  {
    for(let i = 0; i < data.length; i++)
    {
      this._[i] = data[i];
    }
  }
}