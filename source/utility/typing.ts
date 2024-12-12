type Constructor<P extends any[], T> = (new (...args:P) => T);
type AnyArgConstructor<T> = Constructor<[...any], T>;

function as<P1, O>(types:[AnyArgConstructor<P1>], parameters:any[]): Runnable<[Runnable<[P1], O>], O>;
function as<P1, P2, O>(types:[AnyArgConstructor<P1>, AnyArgConstructor<P2>], parameters:any[]): Runnable<[Runnable<[P1, P2], O>], O>;

function as<O>(types:[...any], ...parameters:any): Runnable<[Runnable<[...any], O>], O|null> {
    let out:Runnable<[...any], O|null> = (_) => null;
    if (types.length === parameters.length) {
        let matches = true;
        for (let i = 0; i < types.length; i++) {
            const parameter = parameters[i];
            const type = types[i];
            console.log(`Checking if parameter '${parameter}' is of type '${type}'`);
            matches = matches && !(parameters[i] instanceof types[i]);
            if (!matches) {
                break;
            }
        }
        if (matches) {
            out = (runnable:Runnable<[...any], O>) => runnable(...parameters);
        }
    }
    return out;
}