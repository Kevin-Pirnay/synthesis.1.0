
export class Attribute_Handler
{
    public set_attribute_to_those_dtos(attribute_name : string, value : string, dtos_ids : string[]) : void
    {
        dtos_ids.forEach((id : string) => 
        {
            try{
                const element = document.getElementById(id) as HTMLElement;
    
                element.setAttribute(attribute_name, value);

            }catch(e) {
                console.log(e);  
            }

        });
    }
}