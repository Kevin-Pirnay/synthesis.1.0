import { Vector } from "./Vector";

export class Vector_
{
    public static zero = () : Vector => { return new Vector(); }

    public static new = (data : number[] = []) : Vector => { return new Vector(data); }

    //****************** non static **************************************************** */

    private readonly __vector : Vector;

    constructor(vector : Vector) { this.__vector = vector; }

    public assign_new_data = (data : Vector) : void => { Assign_Data.assign_new_data(this.__vector, data); }

    public add_by_vector = (vector : Vector) : void => { Add_Vector.add_by_vector(this.__vector, vector); }

    public add_by_vector_new = (vector : Vector) : Vector => { return Add_Vector.add_by_vector_new(this.__vector, vector); }

    public substract_by_vector = (vector : Vector) : void => { Substract_Vector.substract_by_vector(this.__vector, vector); }

    public substract_by_vector_new = (vector : Vector) : Vector => { return Substract_Vector.substract_by_vector_new(this.__vector, vector); }

    public copy = () : Vector => { return Vector_.new(this.__vector._); }
}


//****************** implementation **************************************************** */


class Add_Vector
{
    public static add_by_vector = (v_o : Vector, v_add : Vector) : void =>
    {
        for(let i = 0; i < v_o._.length; i++)
        {
            v_o._[i] += v_add._[i];
        }
    }

    public static add_by_vector_new = (v_o : Vector, v_add : Vector) : Vector =>
    {
        const result = v_o.__.copy();

        for(let i = 0; i < result._.length; i++)
        {
            result._[i] += v_add._[i];
        }

        return result;
    }
}

class Substract_Vector
{
    public static substract_by_vector = (v_o : Vector, v_sub : Vector) : void =>
    {
        for(let i = 0; i < v_o._.length; i++)
        {
            v_o._[i] -= v_sub._[i];
        }
    }

    public static substract_by_vector_new = (v_o : Vector, v_sub : Vector) : Vector =>
    {
        const result = v_o.__.copy();

        for(let i = 0; i < result._.length; i++)
        {
            result._[i] -= v_sub._[i];
        }

        return result;
    }
}

class Assign_Data
{
    public static assign_new_data = (vector : Vector, data : Vector) : void =>
    {
      for(let i = 0; i < data._.length; i++)
      {
        vector._[i] = data._[i];
      }  
    }
}