import { Matrix } from "../../../common/Matrix/Matrix";
import { Matrix_ } from "../../../common/Matrix/Matrix_";
import { Vector } from "../../../common/Vector/Vector";
import { Dto } from "../../../port/driver/dto/Dto";
import { Dto_Type, IDto } from "../../../port/driver/dto/IDto";
import { IPaginate_Data } from "../../use_cases/View_Paginate";
import { IPaginate_Repository } from "../interfaces/IPaginate_Repository";

export class Paginate_Repository implements IPaginate_Repository
{
    private readonly __subtree_dto : IDto[][] = [];
    private readonly __indexes : number[] = [];

    public init_indexes(nb_idexes : number): void 
    {
        this.__indexes.length = 0;

        for(let i = 0; i < nb_idexes; i++)
        {
            this.__indexes[i] = i;
        } 
    }

    public store_subtrees_dtos(subtrees: IDto[][]): void 
    {
        this.__subtree_dto.length = 0;

        subtrees.forEach(subtree => this.__subtree_dto.push(subtree));   
    }

    public get_paginate_data(indexes: number[]): IPaginate_Data 
    {
        const dto1 : Dto[] = this.__subtree_dto[indexes[0]];
        const dto2 : Dto[] = this.__subtree_dto[indexes[1]];

        return new Paginate_Data(dto1, dto2);
    }

    public get_next_indexes(direction: number): number[] 
    {
        if(direction !== 1 && direction !== 0) throw new Error("direction must be either 1 or 0");

        const result : number[] = [];

        for(let i = 0; i < 2; i++)
        {
            let current_index : number | undefined = direction ? this.__indexes.shift() : this.__indexes.pop();

            if(current_index == undefined) throw new Error("Error: indexes are empty");

            result.push(current_index);

            if ( direction ) this.__indexes.push(current_index);
            else this.__indexes.unshift(current_index); 
        }

        return result;
    }
}

class Paginate_Data  implements IPaginate_Data
{
    private readonly __previous : IPaginate_Positions;
    private readonly __next : IPaginate_Positions;

    constructor(dto1 : IDto[], dto2 : IDto[]) 
    { 
        this.__previous = new Paginate_Positions(dto1);
        this.__next = new Paginate_Positions(dto2);
    }

    public set_in_place(direction : number): void 
    {
        this.__next.put_in_place(direction);
    }

    public async rotate(direction : number): Promise<void>
    {
        let radian : number = 0;
        let angle : number = 0;
        const rate : number = direction > 0 ? 1 : -1;

        while(1)
        {
            if(Math.abs(angle) >= 90) break;

            radian = angle * (Math.PI/180);

            this.__next.rotate_by_radian(radian);
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
    put_in_place(direction: number): void;
}

class Paginate_Positions implements IPaginate_Positions
{
    private readonly __positions : IPaginate_Position[];

    constructor(dtos : IDto[])
    {
        dtos.forEach(dto =>
        {
            if (dto.type == Dto_Type.CONTAINER) this.__positions.push(new Container_Paginate_Position(dto));
            else if (dto.type == Dto_Type.LIGATURE) this.__positions.push(new Ligature_Paginate_Position(dto));
        });
    }

    rotate_by_radian(radian: number): void 
    {
        this.__positions.forEach(position =>
        {
            position.rotate_by_radian(radian);
        });
    }

    public put_in_place(direction: number): void 
    {
        this.__positions.forEach(position =>
        {
            position.turn_ninety(direction);
        });
    }
}

interface IPaginate_Position
{
    rotate_by_radian(radian: number): void;
    turn_ninety(direction: number): void;
}

//abstract class to put Math.Pi/2???

class Container_Paginate_Position implements IPaginate_Position
{
    private readonly __abs_ratio : Matrix<4>;

    constructor(dto : IDto) 
    { 
        this.__abs_ratio = dto._.positions.abs_ratio;
    }
    
    rotate_by_radian(radian: number): void 
    {
        this.__abs_ratio.__.multiply_by_matrix(Matrix_.rotation.rotation_X_matrix(Math.PI / 180));

    }

    public turn_ninety(direction: number): void 
    {
        this.__abs_ratio.__.multiply_by_matrix(Matrix_.rotation.rotation_X_matrix(Math.PI / 2));
    }
}

class Ligature_Paginate_Position implements IPaginate_Position
{
    private readonly __abs_ratio : Matrix<4>;

    constructor(dto : IDto) 
    { 
        this.__abs_ratio = dto._.positions.abs_ratio;
    }

    rotate_by_radian(radian: number): void 
    {
        this.__abs_ratio.__.multiply_by_matrix(Matrix_.rotation.rotation_X_matrix(Math.PI / 180));
    }

    public turn_ninety(direction: number): void 
    {
        this.__abs_ratio.__.multiply_by_matrix(Matrix_.rotation.rotation_X_matrix(Math.PI / 2));
    }
}