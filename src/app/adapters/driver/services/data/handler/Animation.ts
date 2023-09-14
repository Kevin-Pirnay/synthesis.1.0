import { Attribute_Handler } from "./Attribute";

export class Animation_Handler 
{
    constructor(private readonly __attribute: Attribute_Handler) { }

    public async anim_opacity_from_0_to_1_at_this_rate_for_those_dtos(rate: number, dtos_ids: string[]): Promise<void> 
    {
        let current_opacity: number = 0;

        while (1) 
        {            
            if (current_opacity > 1) break;            

            this.__attribute.set_attribute_to_those_dtos("opacity", `${current_opacity}`, dtos_ids);

            current_opacity += 1 * rate;

            await new Promise(r => setTimeout(r, 1));
        }
    }
}
