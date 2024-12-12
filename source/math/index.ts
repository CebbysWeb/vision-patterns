class Vector2D<T extends number> {
    constructor(public x: T, public y: T) {}

    scale(by:number): Vector2D<T> {
        return new Vector2D((this.x * by) as T, (this.y * by) as T);
    }
}