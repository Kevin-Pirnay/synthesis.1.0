import { Matrix } from "../../../common/Matrix/Matrix";
import { IDto, Data_Type } from "../../../port/driver/dto/IDto";
import { IPaginate_Data } from "../../use_cases/Paginate/View_Paginate";


export class Paginate_Data implements IPaginate_Data 
{
    private readonly __previous: IPaginate_Positions;
    private readonly __next: IPaginate_Positions;

    constructor(dto1: IDto[], dto2: IDto[]) 
    {
        this.__previous = new Paginate_Positions(dto1);
        this.__next = new Paginate_Positions(dto2);
    }

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
            if (dto.type == Data_Type.CONTAINER) this.__positions.push(new Container_Paginate_Position(dto));
            else if (dto.type == Data_Type.LIGATURE) this.__positions.push(new Ligature_Paginate_Position(dto));
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


export class Abstract__Paginate_Position implements IPaginate_Position 
{
    private readonly __abs_ratio: Matrix<any>;
    private readonly __fixe_pos: Matrix<any>;

    constructor(dto: IDto) 
    {
        this.__abs_ratio = dto.element.positions.abs_ratio;
        this.__fixe_pos = this.__abs_ratio.__.copy();
    }

    public rotate_on_y_by_radian(radian: number): void 
    {
        this.__abs_ratio.__.assign_new_data(this.__fixe_pos.__.rotate_y_new(radian));
    }
}

export class Container_Paginate_Position extends Abstract__Paginate_Position { }

export class Ligature_Paginate_Position extends Abstract__Paginate_Position { }

