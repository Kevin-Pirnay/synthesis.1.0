import { Create_Container_Use_case } from './use_cases/Create_Container';
import { Create_Container_Request } from "../port/driver/request/Create_Container_Request";
import { Create_Container_Response } from '../port/driver/response/Create_Container_Response';

export class Facade
{
    private __create_container_use_case = new Create_Container_Use_case();

    public create_container = (request : Create_Container_Request) : Create_Container_Response =>
    {
        return this.__create_container_use_case.handle(request);
    }
}