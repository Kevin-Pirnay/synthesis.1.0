import { Matrix } from "../../../common/Matrix/Matrix";
import { Matrix_ } from "../../../common/Matrix/Matrix_";
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
        if(direction !== 1 && direction !== -1) throw new Error("direction must be either 1 or -1");

        const result : number[] = [];

        for(let i = 0; i < 2; i++)
        {
            let current_index : number | undefined = direction == 1 ? this.__indexes.shift() : this.__indexes.pop();

            if(current_index == undefined) throw new Error("Error: indexes are empty");

            result.push(current_index);

            if ( direction == 1 ) this.__indexes.push(current_index);
            else this.__indexes.unshift(current_index); 
        }
        console.log(result);
        
        return result;
    }

    public get_paginate_dtos(indexes: number[]): IDto[] 
    {
        const result : IDto[] = [];

        indexes.forEach((index : number) =>
        {
            this.__subtree_dto[index].forEach((dto : IDto) =>
            {
                result.push(dto);
            });
        });
        
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
        this.__next.put_in_place(-direction);
        this.__previous.put_in_place(0);
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
    put_in_place(direction: number): void;
}

class Paginate_Positions implements IPaginate_Positions
{
    private readonly __positions : IPaginate_Position[] = [];

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
            //position.reset_place();
            position.turn_ninety(direction);
        });
    }
}

interface IPaginate_Position
{
    reset_place(): void;
    rotate_by_radian(radian: number): void;
    turn_ninety(direction: number): void;
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

    public reset_place(): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fixe_pos);
    }
    
    rotate_by_radian(radian: number): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fixe_pos.__.multiply_by_matrix_new(Matrix_.rotation.rotation_Y(radian)));
    }

    public turn_ninety(direction: number): void 
    {
        this.__abs_ratio.__.multiply_by_matrix(Matrix_.rotation.rotation_Y((Math.PI / 2) * direction));
    }
}

class Container_Paginate_Position extends Abstract__Paginate_Position { }

class Ligature_Paginate_Position extends Abstract__Paginate_Position { }