import { Matrix } from "../../../../common/Matrix/Matrix";
import { IDto } from "../../../../port/driver/dto/IDto";
import { Ligature } from "../../../entities/Ligature";
import { Data_Type } from "../../../entities/Data_Type";
import { IPaginate_Data } from "./View_Paginate";


export class Paginate_Data implements IPaginate_Data 
{
    private readonly __step : IStep;
    private readonly __previous: IPaginate_Positions;
    private readonly __next: IPaginate_Positions;

    constructor(dto1: IDto[], dto2: IDto[]) 
    {
       this.__step = new Step();

        this.__previous = new Paginate_Positions(dto1);

        this.__next = new Paginate_Positions(dto2);    
    }
    
    public async rotate(direction: number, rate : number): Promise<void> 
    {
        this.__step.init(90);

        this.__next.init_phase((Math.PI / 2) * (-direction));

        this.__previous.init_phase(0);

        while(1)
        {
            if ( this.__step.completed() ) break;

            this.__next.rotate_on_y_by_one_radian(direction, rate);

            this.__previous.rotate_on_y_by_one_radian(direction, rate);

            this.__step.next_step(rate);

            await new Promise(r => setTimeout(r,1));            
        }
    }
}

interface IStep
{
    completed() : boolean;
    init(max_angle : number) : void;
    next_step(rate : number) : void;
}

class Step implements IStep
{
    private __max_step : number = 0;

    private __current_sep : number = 0;

    public completed(): boolean 
    {
        return this.__current_sep >= this.__max_step ? true : false; 
    }
    
    public init(max_angle : number): void 
    {
        this.__max_step = max_angle;

        this.__current_sep = 0;
    }

    public next_step(rate : number): void 
    {
        this.__current_sep+= rate;
    } 
}

interface IPaginate_Positions 
{
    init_phase(phase: number): void;
    rotate_on_y_by_one_radian(direction : number, rate : number) : void
}

class Paginate_Positions implements IPaginate_Positions 
{
    private readonly __positions: IPaginate_Position[] = [];

    constructor(dtos: IDto[]) 
    {
        dtos.forEach(dto => 
        {
            if ( dto.type === Data_Type.CONTAINER ) this.__positions.push(new Container_Paginate_Position(dto));
            if ( dto.type === Data_Type.LIGATURE ) this.__positions.push(new Ligature_Paginate_Position(dto));
        });
    }

    public init_phase(phase: number): void 
    {
        this.__positions.forEach(position => 
        {
            position.rotate_on_y_at_phase(phase);
        });
    }

    public rotate_on_y_by_one_radian(direction : number, rate : number) : void
    {
        this.__positions.forEach(position => 
        {
            position.rotate_on_y_by_one_radian(direction, rate);
        });
    }
}


interface IPaginate_Position 
{
    rotate_on_y_at_phase(phase: number): void;
    rotate_on_y_by_one_radian(direction : number, rate : number) : void
}

class Container_Paginate_Position implements IPaginate_Position
{
    private readonly __abs_ratio: Matrix<any>;

    constructor(dto: IDto) 
    {
        this.__abs_ratio = dto.element.positions.abs_ratio;
    }

    public rotate_on_y_at_phase(phase: number): void 
    {
        this.__abs_ratio.__.rotate_y(phase);
    }

    public rotate_on_y_by_one_radian(direction : number, rate : number)
    {
        this.__abs_ratio.__.rotate_y(Math.PI / 180 * direction * rate);
    }
}

class Ligature_Paginate_Position implements IPaginate_Position
{
    private readonly __ligature : Ligature;

    constructor(dto : IDto) 
    { 
        this.__ligature = dto.element;
    }

    rotate_on_y_at_phase(phase: number): void 
    {
        this.__ligature.__.update_ratio();
    }

    rotate_on_y_by_one_radian(direction: number, rate : number): void 
    {
        this.__ligature.__.update_ratio();
    }
}