type Runnable<I extends any[], O> = (...args:I) => O;
type Consumer<P extends any[]> = Runnable<P, void>;
type Supplier<P> = Runnable<[], P>;