
export class Ptr<T> 
{
  public _: T | null = null;

  constructor(init : T | null = null)
  {
    this._ = init;
  }
}