import { Container_Positions } from '../../entities/Container';


export class Container_Positions_ {
    constructor(private readonly __positions: Container_Positions) { }

    public copy(): Container_Positions {
        const new_positions_ptr = new Container_Positions();

        new_positions_ptr.abs_ratio.__.assign_new_data(this.__positions.abs_ratio.__.copy());
        new_positions_ptr.rel_ratio.__.assign_new_data(this.__positions.rel_ratio.__.copy());
        new_positions_ptr.abs_root.__.assign_new_data(this.__positions.abs_root.__.copy());
        new_positions_ptr.rel_root.__.assign_new_data(this.__positions.rel_root.__.copy());

        return new_positions_ptr;
    }
}
