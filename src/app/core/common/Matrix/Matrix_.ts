import { Vector } from "../Vector/Vector";
import { Vector_ } from "../Vector/Vector_";
import { Matrix } from "./Matrix";

export class Matrix_
{
    public static new = (vectors : Vector[] = []) : Matrix<any> => { return new Matrix(vectors); }

    public static rotation_x = (radian : number) : Matrix<3> => { return Rotation.rotation_X(radian); }

    public static rotation_y = (radian : number) : Matrix<3> => { return Rotation.rotation_Y(radian); }

    public static rotation_z = (radian : number) : Matrix<3> => { return Rotation.rotation_Z(radian); }

    //****************** non static **************************************************** */

    private readonly __matrix : Matrix<any>;

    constructor(matrix : Matrix<any>) { this.__matrix = matrix; }

    public add = (vector : Vector) : Matrix<any> => { this.__matrix._.push(vector); return this.__matrix }

    public assign_new_data = (data : Matrix<any>) : Matrix<any> => { Assign_Data.assign_new_data(this.__matrix, data); return this.__matrix; }

    public add_by_vector = (vector : Vector) : Matrix<any> => { Add_Vector.add_by_vector(this.__matrix, vector); return this.__matrix; }

    public add_by_vector_new = (vector : Vector) : Matrix<any> => { return Add_Vector.add_by_vector_new(this.__matrix, vector); }

    public substract_by_vector = (vector : Vector) : Matrix<any> => { Substract_Vector.substract_by_vector(this.__matrix, vector); return this.__matrix; }

    public substract_by_vector_new = (vector : Vector) : Matrix<any> => { return Substract_Vector.substract_by_vector_new(this.__matrix, vector); }

    public copy = () : Matrix<any> => { return Copy.copy(this.__matrix); }

    public multiply_by_factor = (factor : number) : Matrix<any> => { Multiply.multiply_by_factor(this.__matrix, factor); return this.__matrix; }

    public multiply_by_factor_new = (factor : number) : Matrix<any> => { return Multiply.multiply_by_factor_new(this.__matrix, factor); }

    public multiply_by_matrix = (transform : Matrix<any>) : Matrix<any> => { Multiply.multiply_by_matrix(this.__matrix, transform); return this.__matrix; }

    public multiply_by_matrix_new = (transform : Matrix<any>) : Matrix<any> => { return Multiply.multiply_by_matrix_new(this.__matrix, transform); }

    public rotate_x = (radian : number) : Matrix<any> => { Rotate.rotate_x(this.__matrix, radian); return this.__matrix; }

    public rotate_y = (radian : number) : Matrix<any> => { Rotate.rotate_y(this.__matrix, radian); return this.__matrix; }

    public rotate_z = (radian : number) : Matrix<any> => { Rotate.rotate_z(this.__matrix, radian); return this.__matrix; }

    public rotate_x_new = (radian : number) : Matrix<any> => { return Rotate.rotate_x_new(this.__matrix, radian); }

    public rotate_y_new = (radian : number) : Matrix<any> => { return Rotate.rotate_y_new(this.__matrix, radian); }

    public rotate_z_new = (radian : number) : Matrix<any> => { return Rotate.rotate_z_new(this.__matrix, radian); }
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

class Multiply
{
    public static multiply_by_factor = (matrix : Matrix<any>, factor : number) : void =>
    {
        for(let i = 0; i < matrix._.length; i++)
        {
            for(let j = 0; j < matrix._[i]._.length; j++)
            {
                matrix._[i]._[j] *= factor;
            }
        }
    }

    public static multiply_by_factor_new = (m_o : Matrix<any>, factor : number) : Matrix<any> =>
    {
        const result : Matrix<any> = m_o.__.copy();

        for(let i = 0; i < result._.length; i++)
        {
            for(let j = 0; j < result._[i]._.length; j++)
            {
                result._[i]._[j] *= factor;
            }
        }

        return result;
    }

    public static multiply_by_matrix = (matrix : Matrix<any>, transform : Matrix<any>) : void =>
    {
        //TODO: verify input
    
        for(let i = 0; i < matrix._.length; i++) //for each old points
        {            
            for(let j = 0; j < transform._.length; j++) //for each axes of transform
            {
                let new_coordinate: number = 0;

                for(let l = 0; l < transform._[j]._.length; l++) //for each dimension of each axes in transform
                { 
                    new_coordinate += matrix._[i]._[l] * transform._[j]._[l]; //here l is the dimension, j is the current axe of the transform and i is the old point that is being currently mapping
                }
                
                matrix._[i]._[j] = new_coordinate;
            }            
        }
    }

    public static multiply_by_matrix_new = (m_o : Matrix<any>, transform : Matrix<any>) : Matrix<any> =>
    {
        //TODO: verify input

        const result : Matrix<any> = new Matrix();
    
        for(let i = 0; i < m_o._.length; i++) //for each old points
        {
            const new_vector = Vector_.zero();//new point
            
            for(let j = 0; j < transform._.length; j++) //for each axes of transform
            {
                let new_coordinate: number = 0;

                for(let l = 0; l < transform._[j]._.length; l++) //for each dimension of axes in transform
                { 
                    new_coordinate += m_o._[i]._[l] * transform._[j]._[l]; //here l is the dimension, j is the current axe of the transform and i is the old point that is being currently mapping
                }
                
                new_vector._[j] = new_coordinate;
            }
            
            result.__.add(new_vector);
        }

        return result;
    }
}

class Rotation 
{
    public static rotation_Y = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([Math.cos(radian), 0, Math.sin(radian)]),
                Vector_.new([0, 1, 0]),
                Vector_.new([-Math.sin(radian), 0, Math.cos(radian)])
            ]
        );
    };

    public static rotation_X = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([1, 0, 0]),
                Vector_.new([0, Math.cos(radian), -Math.sin(radian)]),
                Vector_.new([0, Math.sin(radian), Math.cos(radian)])
            ]
        );
    };

    public static rotation_Z = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([Math.cos(radian), Math.sin(radian), 0]),
                Vector_.new([-Math.sin(radian), Math.cos(radian), 0]),
                Vector_.new([0, 0, 1])
            ]
        );
    };
}

class Rotate
{
    public static rotate_x_new(matrix : Matrix<any>, radian : number) : Matrix<any>
    {
        return matrix.__.multiply_by_matrix_new(Rotation.rotation_X(radian));
    }

    public static rotate_y_new(matrix : Matrix<any>, radian : number) : Matrix<any>
    {
        return matrix.__.multiply_by_matrix_new(Rotation.rotation_Y(radian));
    }

    public static rotate_z_new(matrix : Matrix<any>, radian : number) : Matrix<any>
    {
        return matrix.__.multiply_by_matrix_new(Rotation.rotation_Z(radian));
    }

    public static rotate_x(matrix : Matrix<any>, radian : number) : void
    {
        matrix.__.multiply_by_matrix(Rotation.rotation_X(radian));
    }

    public static rotate_y(matrix : Matrix<any>, radian : number) : void
    {
        matrix.__.multiply_by_matrix(Rotation.rotation_Y(radian));
    }

    public static rotate_z(matrix : Matrix<any>, radian : number) : void
    {
        matrix.__.multiply_by_matrix(Rotation.rotation_Z(radian));
    }
}
