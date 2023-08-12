import { Matrix } from '../../../common/Matrix/Matrix';
import { Vector } from '../../../common/Vector/Vector';
import { IDao_Container } from '../../../port/driven/dao/IDao_Container';
import { IDao_Ligature } from '../../../port/driven/dao/IDao_Ligature';
import { Container } from '../../entities/Container';
import { Ligature } from '../../entities/Ligature';
import { IMove_View_Positions } from '../../use_cases/Move_View';
import { IMove_View_Repository } from './../interfaces/IMove_View_Repository';

export class Move_View_Repository implements IMove_View_Repository
{
    constructor(
        private readonly __dao_container : IDao_Container,  
        private readonly __dao_ligature : IDao_Ligature
    ) { }
    
    public get_all_positions(): IMove_View_Positions[] 
    {
        const containers : Container[] = this.__dao_container.get_all();
        const ligatures : Ligature[] = this.__dao_ligature.get_all();

        const result : IMove_View_Positions[] = [];

        containers.forEach(container => result.push(new Container_Move_View_Positions(container)));
        ligatures.forEach(ligature => result.push(new Ligature_Move_View_Positions(ligature)));

        return result;
    }
}

class Container_Move_View_Positions implements IMove_View_Positions
{
    private readonly __abs_root : Vector;
    private readonly __abs_ratio : Matrix<4>;

    constructor(container : Container) 
    { 
        this.__abs_root = container.positions.abs_root;
        this.__abs_ratio = container.positions.abs_ratio;
    }

    public assign_values(matrix: Matrix<any>): void 
    {
        this.__abs_ratio.__.assign_new_data(matrix);
    }

    public copy(): Matrix<4> 
    {
        return this.__abs_ratio.__.copy();
    }

    public move_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
        this.__abs_root.__.add_by_vector(delta);
    }
}

class Ligature_Move_View_Positions implements IMove_View_Positions
{
    private readonly __abs_ratio : Matrix<3>;

    constructor(ligature : Ligature) 
    {
        this.__abs_ratio = ligature.positions.abs_ratio;   
    }

    public assign_values(matrix: Matrix<any>): void 
    {
        this.__abs_ratio.__.assign_new_data(matrix);
    }

    public copy(): Matrix<3> 
    {
        return this.__abs_ratio.__.copy();
    }

    public move_by_delta(delta: Vector): void 
    {
        this.__abs_ratio.__.add_by_vector(delta);
    }
}