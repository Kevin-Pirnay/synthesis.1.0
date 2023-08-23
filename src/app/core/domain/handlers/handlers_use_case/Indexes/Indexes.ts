import { IIndexes } from "./IIndexes";


export class Indexes implements IIndexes
{
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

    public get_next_indexes(direction: number): number[] 
    {
        if(direction !== 1 && direction !== -1) throw new Error("direction must be either 1 or -1");

        const result : number[] = [];
        
        const indexes : INext_Indexes = Next_Indexes.get_data(this.__indexes);
        
        if(direction == 1) indexes.push_indexes_for_positive_direction(result);
        
        else indexes.push_indexes_for_negative_direction(result);

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