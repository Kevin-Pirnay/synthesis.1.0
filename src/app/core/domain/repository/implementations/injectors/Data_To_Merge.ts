import { Vector_ } from "../../../../common/Vector/Vector_";
import { IDao_Container } from "../../../../port/driven/dao/IDao_Container";
import { IDao_Flow } from "../../../../port/driven/dao/IDao_Flow";
import { IDao_Ligature } from "../../../../port/driven/dao/IDao_Ligature";
import { Container } from "../../../entities/Container";
import { Ligature } from "../../../entities/Ligature";
import { Data_Type } from "../../../entities/Data_Type";
import { Ligature_ } from "../../../handlers/handlers_entities/Ligature_";
import { INode_Linker } from "../../../handlers/handlers_use_case/Link_Node/INode_Linker";
import { IData_Tree } from "../../../handlers/handlers_use_case/View_As_Root/IData_Tree";
import { IView_As_Root_Handler } from "../../../handlers/handlers_use_case/View_As_Root/IView_As_Root_Handler";
import { IData_To_Merge } from "../Change_Flow_Repository";

export class Data_To_Merge implements IData_To_Merge 
{
    constructor(
        private readonly data_to_merge: IData_Tree[],
        private readonly container_to_link: Container,
        private readonly origin_flow: string,
        private readonly view_as_root_handler: IView_As_Root_Handler,
        private readonly nodes_linker: INode_Linker,
        private readonly container_dao: IDao_Container,
        private readonly ligature_dao: IDao_Ligature,
        private readonly flow_dao: IDao_Flow
    ) { }

    public save_the_data_to_merge_in_the_original_flow(): void 
    {
        this.data_to_merge.forEach(data => 
        {
            if (data.type == Data_Type.CONTAINER) 
            {
                //refactor
                const container: Container = data.element;
                container.positions = container.positions.__.copy();
                container.node = container.node.__.copy();
                if (container.back_roots.length) container.back_roots.push(this.origin_flow); //if this is a root of another flow, add this flow t its back_roots
                this.container_dao.save_the_container_into_this_flow(container, this.origin_flow);
            }

            if (data.type == Data_Type.LIGATURE) this.ligature_dao.save_the_ligature_into_this_flow(data.element, this.origin_flow);
        });
    }

    public change_the_current_flow_into_the_original(): void 
    {
        this.flow_dao.change_current_flow(this.origin_flow);
    }

    public translate_the_data_to_merge_according_to_the_container_to_link(): void 
    {
        const delta = Vector_.new([200, 0, 0]); //put that in memory

        this.data_to_merge[0].element.positions.rel_root.__.assign_new_data(delta); //data[0] is the root of the tree to merge 
    }

    public create_the_ligature_to_link_the_container_to_the_root_of_data_to_merge(): Ligature 
    {
        const ligature = Ligature_.new(this.container_to_link, this.data_to_merge[0].element);

        this.ligature_dao.save_the_new_ligature(ligature);

        this.data_to_merge.push({ element: ligature, type: Data_Type.LIGATURE });

        return ligature;
    }

    public links_nodes(parent_container: Container, ligature: Ligature, child_container: Container): void 
    {
        this.nodes_linker.link_nodes(parent_container, ligature, child_container);
    }

    public get_the_new_tree(): IData_Tree[] 
    {
        return this.view_as_root_handler.get_subtree_from_root_of_the_current_flow();
    }
}
