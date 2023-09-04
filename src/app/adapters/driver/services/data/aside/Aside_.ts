import { Aside } from "./Aside.1";
import { Aside__Current_View_ } from "./Aside__Current_View_";



export class Aside_ {
  public readonly current_view: Aside__Current_View_;

  constructor(aside: Aside) {
    this.current_view = new Aside__Current_View_(aside);
  }
}
