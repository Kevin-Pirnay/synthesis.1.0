import { Vector } from "../Vector/Vector";
import { Vector_ } from "../Vector/Vector_";
import { Matrix } from "./Matrix";

export class Matrix_
{
    public static new = (vectors : Vector[] = []) : Matrix<any> => { return new Matrix(vectors); }

    //****************** non static **************************************************** */

    private readonly __matrix : Matrix<any>;

    constructor(matrix : Matrix<any>) { this.__matrix = matrix; }

    public assign_new_data = (data : Matrix<any>) : void => { Assign_Data.assign_new_data(this.__matrix, data); }

    public add_by_vector = (vector : Vector) : void => { Add_Vector.add_by_vector(this.__matrix, vector); }

    public add_by_vector_new = (vector : Vector) : Matrix<4> => { return Add_Vector.add_by_vector_new(this.__matrix, vector); }

    public substract_by_vector = (vector : Vector) : void => { Substract_Vector.substract_by_vector(this.__matrix, vector); }

    public substract_by_vector_new = (vector : Vector) : Matrix<any> => { return Substract_Vector.substract_by_vector_new(this.__matrix, vector); }

    public copy = () : Matrix<any> => { return Copy.copy(this.__matrix); }
}


//****************** implementation **************************************************** */


class Assign_Data
{
    public static assign_new_data = (matrix : Matrix<any>, data : Matrix<any>) : void =>
    {
        //TODO : verify input 

        for(let i = 0; i < data._.length; i++)
        {
            for(let j = 0; j < data._[i]._.length; j++)
            {
                matrix._[i]._[j] = data._[i]._[j];
            }
        }
    }
}

class Add_Vector
{
    public static add_by_vector = (matrix : Matrix<any>, vector : Vector) : void =>
    {
        for(let i = 0; i < matrix._.length; i++)
        {
            for(let j = 0; j < vector._.length; j++)
            {
                matrix._[i]._[j] += vector._[j];
            }
        }
    }

    public static add_by_vector_new = (m_o : Matrix<any>, vector : Vector) : Matrix<any> =>
    {
        const result : Matrix<any> = m_o.__.copy();

        for(let i = 0; i < result._.length; i++)
        {
            for(let j = 0; j < vector._.length; j++)
            {
                result._[i]._[j] += vector._[j];
            }
        }

        return result;
    }
}

class Substract_Vector
{
    public static substract_by_vector = (matrix : Matrix<any>, vector : Vector) : void =>
    {
        for(let i = 0; i < matrix._.length; i++)
        {
            for(let j = 0; j < vector._.length; j++)
            {
                matrix._[i]._[j] -= vector._[j];
            }
        }
    }

    public static substract_by_vector_new = (m_o : Matrix<any>, vector : Vector) : Matrix<any> =>
    {
        const result : Matrix<any> = m_o.__.copy();

        for(let i = 0; i < result._.length; i++)
        {
            for(let j = 0; j < vector._.length; j++)
            {
                result._[i]._[j] -= vector._[j];
            }
        }

        return result;
    }
}

class Copy
{
    public static copy = (matrix : Matrix<any>) : Matrix<any> =>
    {
        const result = new Matrix<any>();

        for(let i = 0; i < matrix._.length; i++)
        {
            result._.push(Vector_.new(matrix._[i]._));
        }
        return result;
    }
}