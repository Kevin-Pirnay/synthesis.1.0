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
    // const p1 = Vector_.new([1,2]);
    // const p2 = Vector_.new([2,2.7]);
    // const p3 = Vector_.new([3,3.2]);

    // const matrix = new Matrix([p1,p2,p3]);

    // const y_res = new Vector([1,7,-4]);

    // const result = new Cramer_Quadratic(p1,p2,p3).get_coefficients();
    
    // console.log(result);

    //const result = Math.log(16) / Math.log(2);

    //console.log(result);

    let result =-2;
    let previous_x = -2;
    let current_x = -2;
    let previous_y = -2;
    let current_y = -2;

    const interval = 1;

    for(let i = 0; i < (2 + 4)/interval; i++)
    {
      current_x += interval;
        current_y = -1/6 * (current_x * current_x) + 2/3 * current_x + 0;
        previous_y = -1/6 * (previous_x * previous_x) + 2/3 * previous_x + 0;

        const delta_y = current_y - previous_y;

        result = result + delta_y;        
        
        previous_x += interval
        //previous_y = current_y;
    }    
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

  public get_coefficients() : Vector
  {
    return this.__run_cramer_rule(this.__matrix, this.__y_vector);
  }
}
