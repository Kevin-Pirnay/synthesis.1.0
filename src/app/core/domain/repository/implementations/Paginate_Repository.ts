import { Matrix } from "../../../common/Matrix/Matrix";
import { Matrix_ } from "../../../common/Matrix/Matrix_";
import { Vector } from "../../../common/Vector/Vector";
import { Data_Type, IDto } from "../../../port/driver/dto/IDto";
import { ISubtree_Root, View_As_Root_Handler } from "../../handlers/View_As_Root/View_As_Root_Handler";
import { IPaginate_Data } from "../../use_cases/View_Paginate";
import { IPaginate_Repository } from "../interfaces/IPaginate_Repository";

export class Paginate_Repository implements IPaginate_Repository
{
    private readonly __roots_subtree : ISubtree_Root[] = [];
    private __data_dtos : IDto[][] = [];
    private readonly __indexes : number[] = [];

    public init_indexes(nb_idexes : number): number 
    {
        this.__indexes.length = 0;

        for(let i = 0; i < nb_idexes; i++)
        {
            this.__indexes.push(i);
        } 

        const current = this.__indexes.shift();        

        if(current == undefined) throw new Error("Error: indexes are empty"); 

        this.__indexes.push(current);

        return current;
    }

    public store_subtrees_root(roots_subtrees: ISubtree_Root[]): void 
    {
        this.__roots_subtree.length = 0;

        roots_subtrees.forEach(root => this.__roots_subtree.push(root));   
    }

    //bug if only one, call after next indexes, bad design should be responsible for all the flow of the code in one method, not give that to the caller!!!
    public get_paginate_data(indexes: number[], root_point : Vector, view_as_root_handler : View_As_Root_Handler): IPaginate_Data 
    {
        const dto1 : IDto[] = view_as_root_handler.get_subtree_dtos(this.__roots_subtree[indexes[0]],root_point);
        const dto2 : IDto[] = view_as_root_handler.get_subtree_dtos(this.__roots_subtree[indexes[1]],root_point);

        this.__data_dtos = [dto1,dto2];

        return new Paginate_Data(dto1, dto2);
    }

    public get_next_indexes(direction: number): number[] 
    {
        if(direction !== 1 && direction !== -1) throw new Error("direction must be either 1 or -1");

        const result : number[] = [];
        
        const indexes : INext_Indexes = Next_Indexes.get_data(this.__indexes);
        
        if(direction == 1) indexes.push_indexes_for_positive_direction(result);
        
        else indexes.push_indexes_for_negative_direction(result);

        return result;
    }

    public get_paginate_dtos(): IDto[] 
    {
        const result : IDto[] = [];
        
        this.__data_dtos.forEach(dtos => dtos.forEach((dto : IDto) =>
        {
            result.push(dto);
        }));
        
        return result;
    }
}

interface INext_Indexes
{
    push_indexes_for_negative_direction(result: number[]): void;
    push_indexes_for_positive_direction(result: number[]): void;
}

//refactor to handle one indexes in the queue only
class Next_Indexes implements INext_Indexes
{
    public static get_data(indexes: number[]): INext_Indexes 
    {
        return new Next_Indexes(indexes);
    }

    private readonly __indexes : number[];

    constructor(indexes : number[])
    {
        this.__indexes = indexes;
    }

    public push_indexes_for_positive_direction(result: number[]): void 
    {
        const current = this.__indexes.pop();
        const next = this.__indexes.shift();         

        if(current == undefined || next == undefined) throw new Error("Error: indexes are empty");
        
        result.push(current);
        result.push(next);
        
        this.__indexes.push(current);
        this.__indexes.push(next);
    }

    public push_indexes_for_negative_direction(result: number[]): void 
    {
        const current = this.__indexes.pop();
        const next = this.__indexes.pop();

        if(current == undefined || next == undefined) throw new Error("Error: indexes are empty");

        result.push(current);
        result.push(next);

        this.__indexes.push(next);
        this.__indexes.unshift(current);
    }
}

class Paginate_Data implements IPaginate_Data
{
    private readonly __previous : IPaginate_Positions;
    private readonly __next : IPaginate_Positions;

    constructor(dto1 : IDto[], dto2 : IDto[]) 
    { 
        this.__previous = new Paginate_Positions(dto1);
        this.__next = new Paginate_Positions(dto2);
    }

    public async rotate(direction : number): Promise<void>
    {
        if ( direction !== 1 && direction !== -1 ) throw new Error("direction must be either 1 or -1");
        let radian : number = 0;
        let angle : number = 0;
        const step : number = 0.5
        const rate : number = step * direction

        while(1)
        {
            if(Math.abs(angle) >= 90) break;

            radian = angle * (Math.PI/180);

            this.__next.rotate_by_radian(radian + (Math.PI/2) * (-direction));
            this.__previous.rotate_by_radian(radian);

            await new Promise(r => setTimeout(r, 1));

            angle += rate;
            
            if(angle >= 360) angle = 0;
        }
    }
}

interface IPaginate_Positions
{
    rotate_by_radian(radian: number): void;
}

class Paginate_Positions implements IPaginate_Positions
{
    private readonly __positions : IPaginate_Position[] = [];

    constructor(dtos : IDto[])
    {
        dtos.forEach(dto =>
        {
            if (dto.type == Data_Type.CONTAINER) this.__positions.push(new Container_Paginate_Position(dto));
            else if (dto.type == Data_Type.LIGATURE) this.__positions.push(new Ligature_Paginate_Position(dto));
        });
    }

    rotate_by_radian(radian: number): void 
    {
        this.__positions.forEach(position =>
        {
            position.rotate_by_radian(radian);
        });
    }
}

interface IPaginate_Position
{
    rotate_by_radian(radian: number): void;
}

class Abstract__Paginate_Position implements IPaginate_Position
{
    private readonly __abs_ratio : Matrix<any>;
    private readonly __fixe_pos : Matrix<any>;

    constructor(dto : IDto) 
    { 
        this.__abs_ratio = dto._.positions.abs_ratio;
        this.__fixe_pos = this.__abs_ratio.__.copy();
    }
    
    rotate_by_radian(radian: number): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fixe_pos.__.multiply_by_matrix_new(Matrix_.rotation.rotation_Y(radian)));
    }
}

class Container_Paginate_Position extends Abstract__Paginate_Position { }

class Ligature_Paginate_Position extends Abstract__Paginate_Position { }