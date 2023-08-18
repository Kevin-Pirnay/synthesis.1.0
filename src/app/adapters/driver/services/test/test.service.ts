import { Injectable } from '@angular/core';
import { Matrix } from '../../../../core/common/Matrix/Matrix';
import { Vector } from '../../../../core/common/Vector/Vector';
import { Vector_ } from '../../../../core/common/Vector/Vector_';

@Injectable({
  providedIn: 'root'
})
export class TestService 
{
  public test() : void
  {
    // const p1 = Vector_.new([2,1,1]);
    // const p2 = Vector_.new([0,3,-1]);
    // const p3 = Vector_.new([1,2,2]);

    // const matrix = new Matrix([p1,p2,p3]);

    // const y_res = new Vector([1,7,-4]);

    // const result = new Cramer_Quadratic(p1,p2,p3).get_coefficients(matrix, y_res);
    
    // console.log(result);

    const result = Math.log(16) / Math.log(2);

    console.log(result);
    
    
  }
}

class Cramer_Quadratic
{
  private readonly __matrix : Matrix<3> = new Matrix();
  private readonly __y_vector : Vector = new Vector();

  constructor(a: Vector, b : Vector, c : Vector) // 3 dots
  {
    const vectors : Vector[] = [a,b,c];

    for(let i = 0; i < vectors.length; i++ )
    {
      const t1 : number = vectors[i]._[0] ** 2;
      const t2 : number = vectors[i]._[0];
      const t3 : number = 1;

      const vector = new Vector([t1, t2, t3]);      

      this.__matrix._.push(vector);

      this.__y_vector._[i] = (vectors[i]._[1]);
    }    
  }

  private __compute_determinant_3_by_3(matrix : Matrix<3>)
  {
    const t1 : number = matrix._[0]._[0] * this.__compute_dterminant_2_by_2(matrix._[1]._[1], matrix._[1]._[2], matrix._[2]._[1], matrix._[2]._[2]);
    const t2 : number = matrix._[0]._[1] * this.__compute_dterminant_2_by_2(matrix._[1]._[0], matrix._[1]._[2], matrix._[2]._[0], matrix._[2]._[2]) * -1;
    const t3 : number = matrix._[0]._[2] * this.__compute_dterminant_2_by_2(matrix._[1]._[0], matrix._[1]._[1], matrix._[2]._[0], matrix._[2]._[1]);

    return t1 + t2 + t3;
  }

  private __compute_dterminant_2_by_2(a : number, b : number, c : number, d : number) : number
  {
    return a * d - c * b;
  }

  private __run_cramer_rule(matrix : Matrix<3>, y_vec : Vector) : Vector
  {
    const determinant = this.__compute_determinant_3_by_3(matrix);
    
    const result = new Vector();

    for(let i = 0; i < y_vec._.length; i++) //for each equation
    {
      const current_matrix = matrix.__.copy();

      for(let j = 0; j < this.__matrix._.length; j++) //for each vector
      {
        current_matrix._[j]._[i] = y_vec._[j];
      }
      
      const det = this.__compute_determinant_3_by_3(current_matrix);

      const a = det / determinant;

      result._[i] = a;
    } 

    return result;
  }

  public get_coefficients(matrix : Matrix<3>, y_vec : Vector) : Vector
  {
    return this.__run_cramer_rule(matrix, y_vec);
  }
}
