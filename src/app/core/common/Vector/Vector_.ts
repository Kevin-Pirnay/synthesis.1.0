import { Vector } from "./Vector";

export class Vector_
{
    public static zero = (length : number) : Vector<any> => { return Create.new(length); }

    public static new = (data : number[]) : Vector<any> => { return new Vector(data); }

    //****************** non static **************************************************** */

    private readonly __vector : Vector<any>;

    constructor(vector : Vector<any>) { this.__vector = vector; }

    public assign_new_data = (data : Vector<any>) : Vector<any> => { Assign_Data.assign_new_data(this.__vector, data); return this.__vector; }

    public add_by_vector = (vector : Vector<any>) : Vector<any> => { Add_Vector.add_by_vector(this.__vector, vector); return this.__vector; }

    public add_by_vector_new = (vector : Vector<any>) : Vector<any> => { return Add_Vector.add_by_vector_new(this.__vector, vector); }

    public substract_by_vector = (vector : Vector<any>) : Vector<any> => { Substract_Vector.substract_by_vector(this.__vector, vector); return this.__vector; }

    public substract_by_vector_new = (vector : Vector<any>) : Vector<any> => { return Substract_Vector.substract_by_vector_new(this.__vector, vector); }

    public copy = () : Vector<any> => { return Vector_.new(this.__vector._); }

    public multiply_by_factor = (factor : number) : Vector<any> => { Multiply.multiply_by_factor(this.__vector, factor); return this.__vector; }
}


//****************** implementation **************************************************** */


class Create
{
    public static new(length : number) : Vector<any>
    {
        const data : number[] = [];

        for(let i = 0; i  < length; i++) {  data.push(0); }

        return new Vector<any>(data);
    }
}

class Add_Vector
{
    public static add_by_vector = (v_o : Vector<any>, v_add : Vector<any>) : void =>
    {
        for(let i = 0; i < v_o._.length; i++)
        {
            v_o._[i] += v_add._[i];
        }
    }

    public static add_by_vector_new = (v_o : Vector<any>, v_add : Vector<any>) : Vector<any> =>
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
    public static substract_by_vector = (v_o : Vector<any>, v_sub : Vector<any>) : void =>
    {
        for(let i = 0; i < v_o._.length; i++)
        {
            v_o._[i] -= v_sub._[i];
        }
    }

    public static substract_by_vector_new = (v_o : Vector<any>, v_sub : Vector<any>) : Vector<any> =>
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
    public static assign_new_data = (vector : Vector<any>, data : Vector<any>) : void =>
    {
      for(let i = 0; i < data._.length; i++)
      {
        vector._[i] = data._[i];
      }  
    }
}

class Multiply
{
    public static multiply_by_factor = (vector : Vector<any>, factor : number) : void =>
    {
        for(let i = 0; i < vector._.length; i++)
        {
            vector._[i] *= factor;
        }
    }
}