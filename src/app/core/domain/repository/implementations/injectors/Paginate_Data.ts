import { Matrix } from "../../../../common/Matrix/Matrix";
import { IDto } from "../../../../port/driver/dto/IDto";
import { IPaginate_Data } from "./View_Paginate";


export class Paginate_Data implements IPaginate_Data 
{
    private readonly __previous: IPaginate_Positions;
    private readonly __next: IPaginate_Positions;

    constructor(dto1: IDto[], dto2: IDto[]) 
    {
        this.__previous = new Paginate_Positions(dto1);
        this.__next = new Paginate_Positions(dto2);
    }

    //refactor
    public async rotate(direction: number): Promise<void> 
    {
        if (direction !== 1 && direction !== -1) throw new Error("direction must be either 1 or -1");
        let radian: number = 0;
        let angle: number = 0;
        const step: number = 0.5;
        const rate: number = step * direction;

        while (1) 
        {
            if (Math.abs(angle) >= 90) break;

            radian = angle * (Math.PI / 180);

            this.__next.rotate_on_y_by_radian(radian + (Math.PI / 2) * (-direction));
            this.__previous.rotate_on_y_by_radian(radian);

            await new Promise(r => setTimeout(r, 1));

            angle += rate;

            if (angle >= 360) angle = 0;
        }
    }
}

    //debub
// export class Paginate_Data implements IPaginate_Data 
// {
//     private readonly __step : IStep;
//     private readonly __rotate : IRotate;

//     constructor(dto1: IDto[], dto2: IDto[]) 
//     {
//        this.__step = new Step();

//        this.__rotate = new Rotate(dto1, dto2);
//     }

    
//     public async rotate(direction: number): Promise<void> 
//     {
//         this.__step.init(90);

//         while(1)
//         {
//             if ( this.__step.completed() ) break;

//             this.__rotate.rotate_on_y_by_step(direction);

//             this.__step.next_step();

//             await new Promise(r => setTimeout(r,1));            
//         }
//     }
// }

interface IStep
{
    completed() : boolean;
    init(max_angle : number) : void;
    next_step() : void;
}

interface IRotate
{
    rotate_on_y_by_step(direction : number) : void;
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

    public next_step(): void 
    {
        this.__current_sep++;
    } 
}

class Rotate implements IRotate
{
    private readonly __previous: IPaginate_Positions;

    private readonly __next: IPaginate_Positions;

    private readonly __radian : number = Math.PI/180;

    constructor(dto1: IDto[], dto2: IDto[])
    {
        this.__previous = new Paginate_Positions(dto1);

        this.__next = new Paginate_Positions(dto2);
    }

    rotate_on_y_by_step(direction : number): void 
    {
        this.__next.rotate_on_y_by_radian(this.__radian + (Math.PI / 2) * (-direction));

        this.__previous.rotate_on_y_by_radian(this.__radian);
    }
}

export interface IPaginate_Positions 
{
    rotate_on_y_by_radian(radian: number): void;
}

export class Paginate_Positions implements IPaginate_Positions 
{
    private readonly __positions: IPaginate_Position[] = [];

    constructor(dtos: IDto[]) 
    {
        dtos.forEach(dto => 
        {
            this.__positions.push(new Paginate_Position(dto));
        });
    }

    public rotate_on_y_by_radian(radian: number): void 
    {
        this.__positions.forEach(position => 
        {
            position.rotate_on_y_by_radian(radian);
        });
    }
}


export interface IPaginate_Position 
{
    rotate_on_y_by_radian(radian: number): void;
}


export class Paginate_Position implements IPaginate_Position 
{
    private readonly __abs_ratio: Matrix<any>;

    //private readonly __fixe_pos: Matrix<any>;

    constructor(dto: IDto) 
    {
        this.__abs_ratio = dto.element.positions.abs_ratio;

        //this.__fixe_pos = this.__abs_ratio.__.copy();
    }

    public rotate_on_y_by_radian(radian: number): void 
    {
        //const copy = this.__abs_ratio.__.copy();
        //this.__abs_ratio.__.assign_new_data(copy.__.rotate_y_new(radian));
        this.__abs_ratio.__.rotate_y(radian);
    }
}