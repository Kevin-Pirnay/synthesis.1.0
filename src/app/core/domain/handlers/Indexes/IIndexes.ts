
export interface IIndexes
{
    init_indexes(nb_indexes : number) : number;
    get_next_indexes(direction: number) : number[];
}