import { Matrix } from "../Matrix/Matrix";
import { Vector } from "../Vector/Vector";

export class Cramer
{
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

    protected __run_cramer_rule(matrix : Matrix<3>, y_vec : Vector<3>) : Vector<3>
    {
        const determinant = this.__compute_determinant_3_by_3(matrix);
        
        const result = new Vector();

        for(let i = 0; i < y_vec._.length; i++) //for each equations
        {
            const current_matrix = matrix.__.copy();

            for(let j = 0; j < matrix._.length; j++) //for each vectors
            {
                current_matrix._[j]._[i] = y_vec._[j];
            }
            
            const det = this.__compute_determinant_3_by_3(current_matrix);

            const a = det / determinant;

            result._[i] = a;
        } 

        return result;
    }
}

export class Cramer_Quadratic extends Cramer
{

    public readonly coefficients : Vector<3>;

    private readonly __matrix : Matrix<3> = new Matrix();
    private readonly __y_vector : Vector<3> = new Vector();
  
    constructor(a: Vector<2>, b : Vector<2>, c : Vector<2>) // 3 dots
    {
        super();

        const vectors : Vector<3>[] = [a,b,c];
    
        for(let i = 0; i < vectors.length; i++ )
        {
            const t1 : number = vectors[i]._[0] ** 2;
            const t2 : number = vectors[i]._[0];
            const t3 : number = 1;
    
            const vector = new Vector([t1, t2, t3]);      
    
            this.__matrix._.push(vector);
    
            this.__y_vector._[i] = (vectors[i]._[1]);
        }  
        
        this.coefficients = this.__run_cramer_rule(this.__matrix, this.__y_vector);
    }
}