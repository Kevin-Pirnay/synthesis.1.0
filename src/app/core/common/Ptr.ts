
export class Ptr<T> 
{
  public _: T | null = null;
}

export class Ptr_Ref<T>
{
  public readonly ref : T;

  constructor(ref : T)
  {
    this.ref = ref;
  }
}