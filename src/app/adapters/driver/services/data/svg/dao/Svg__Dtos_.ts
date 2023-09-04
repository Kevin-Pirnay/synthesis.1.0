import { IDto } from "../../../../../../core/port/driver/dto/IDto";
import { Svg_Memory } from "../Svg_Memory";


export class Svg__Dtos_ 
{
  constructor(private readonly __memory : Svg_Memory) { }

  public add_dtos(dtos: IDto[]): void 
  {
    dtos.forEach(dto => this.__memory.common_dtos.push(dto));
  }

  public replace_its_current_dtos_by(dtos: IDto[]): void 
  {
    this.__memory.common_dtos.length = 0;

    dtos.forEach(dto => this.__memory.common_dtos.push(dto));
  }

  public replace_its_current_dtos_by_a_dto(dto: IDto): void 
  {
    this.__memory.common_dtos.length = 0;

    this.__memory.common_dtos.push(dto);
  }

  public delete_from_its_dtos(ids_to_delete: string[]) 
  {
    const new_list = this.__memory.common_dtos.filter(dto => !ids_to_delete.includes(dto.element.id));

    this.__memory.common_dtos.length = 0;

    new_list.forEach(dto => this.__memory.common_dtos.push(dto));
  }

  public add_roots_to_roots_choices(roots: IDto[]): void 
  {
    roots.forEach(root => this.__memory.roots_choices.push(root));
  }

  public replace_roots_choices_by(roots: IDto[]) 
  {
    this.__memory.roots_choices.length = 0;

    roots.forEach(root => this.__memory.roots_choices.push(root));
  }

  public remove_all_roots_choices(): void 
  {
    this.__memory.roots_choices.length = 0;
  }

  public get common_dtos() : IDto[]
  {
    return this.__memory.common_dtos;
  }

  public get roots_choices() : IDto[]
  {
    return this.__memory.common_dtos;
  }
}
