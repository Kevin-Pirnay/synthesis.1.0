import { Container } from '../../../domain/entities/Container';
import { Vector } from './../../../common/Vector/Vector';

export class Create_Container_Request
{
    constructor(public position : Vector, public parent_container : Container | null = null) {}
}