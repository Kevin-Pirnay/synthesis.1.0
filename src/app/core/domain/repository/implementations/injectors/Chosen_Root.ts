import { Matrix } from '../../../../common/Matrix/Matrix';
import { Root_Choice } from '../../../entities/Root_Choice';
import { IChoosen_Root } from '../../../use_cases/Choose_Root/Chosen_Root';

export class Chosen_Root implements IChoosen_Root 
{
    private readonly __abs_ratio: Matrix<4>;

    constructor(chosen_root: Root_Choice) 
    {
        this.__abs_ratio = chosen_root.positions.abs_ratio;
    }

    public async anim(): Promise<void> 
    {
        const pos = this.__abs_ratio;
        let count = 0;
        while (1) {
            if (count >= window.innerWidth*2/3) break;

            pos._[0]._[0]--;
            pos._[0]._[1]--;

            pos._[1]._[0]++;
            pos._[1]._[1]--;

            pos._[2]._[0]++;
            pos._[2]._[1]++;

            pos._[3]._[0]--;
            pos._[3]._[1]++;

            await new Promise(r => setTimeout(r, 1));

            count++;
        }
    }
}
