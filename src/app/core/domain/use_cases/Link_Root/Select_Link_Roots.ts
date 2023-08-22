// import { IDto } from '../../../port/driver/dto/IDto';
// import { ILink_Roots_Repository } from '../../repository/interfaces/IRepository';


// export class Select_Link_Roots_Use_case
// {
//     constructor(
//         private readonly __repository : ILink_Roots_Repository, 
//     ) { }

//     public handle(request : Select_Link_Roots_Request) : Select_Link_Roots_Response
//     {
//         const dtos : IDto[] = this.__repository.links_roots(request.container);
     
//         return new Select_Link_Roots_Response(dtos);
//     }
// }