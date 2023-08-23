import { IDto } from "../../../port/driver/dto/IDto";
import { IIndexes } from "../../handlers/handlers_use_case/Indexes/IIndexes";
import { Indexes } from "../../handlers/handlers_use_case/Indexes/Indexes";
import { ISubtree_Root, View_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/View_As_Root_Handler";
import { IPaginate_Data } from "./injectors/View_Paginate";
import { IPaginate_Repository } from "../interfaces/IRepository";
import { Paginate_Data } from "./injectors/Paginate_Data";
import { IView_As_Root_Handler } from "../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";


export class Paginate_Repository implements IPaginate_Repository
{
    private readonly __roots_subtree : ISubtree_Root[] = [];
    private __data_dtos : IDto[][] = [];
    private readonly __indexes : IIndexes;

    constructor() { this.__indexes = new Indexes() }

    public init_indexes(nb_idexes : number): number 
    {
        return this.__indexes.init_indexes(nb_idexes);
    }

    public store_subtrees_roots(roots_subtrees: ISubtree_Root[]): void 
    {
        this.__roots_subtree.length = 0;

        roots_subtrees.forEach(root => this.__roots_subtree.push(root));   
    }

    //bug if only one, call after next indexes, bad design should be responsible for all the flow of the code in one method, not give that to the caller!!!
    public get_paginate_data(indexes: number[], view_as_root_handler : IView_As_Root_Handler): IPaginate_Data 
    {
        const dto1 : IDto[] = view_as_root_handler.get_subtree_from_subtree_root(this.__roots_subtree[indexes[0]]);
        const dto2 : IDto[] = view_as_root_handler.get_subtree_from_subtree_root(this.__roots_subtree[indexes[1]]);

        this.__data_dtos = [dto1,dto2];

        return new Paginate_Data(dto1, dto2);
    }

    public get_next_indexes(direction: number): number[] 
    {
        if(direction !== 1 && direction !== -1) throw new Error("direction must be either 1 or -1");

        return this.__indexes.get_next_indexes(direction);
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