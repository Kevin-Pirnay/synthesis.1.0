
export class Class_Handler
{
    public set_this_class_to_those_dto(class_name : string, ids : string[]) : void
    {
        ids.forEach(id => 
        {
            const element = document.getElementById(id) as HTMLElement;

            element.classList.add(class_name);
        });
    }
}