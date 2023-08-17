
export interface IDto
{
    element : any;
    type : Data_Type;
}

export enum Data_Type 
{
    CONTAINER,
    LIGATURE,
    ROOT_CHOICE
}