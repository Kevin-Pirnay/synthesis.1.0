
export class Observer<T> 
{
    private readonly __listenners: CallBack<T>[] = [];

    public send(data: T): void 
    {
        this.__listenners.forEach(callback => callback(data));
    }

    public subscribe(callback: CallBack<T>): void 
    {
        this.__listenners.push(callback);
    }

    public unsubscribe(callback_to_remove: CallBack<T>): void 
    {
        const index: number = this.__listenners.findIndex(callback => callback == callback_to_remove);
        
        this.__listenners.splice(index, 0);
    }
}
export type CallBack<T> = (data: T) => void;

