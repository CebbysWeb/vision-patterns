enum VitternsWindowEvent {
    RESIZE = 'resize'
}

class VitternsDocument {
    constructor(public document: Document, public window: Window) {}

    getTypedElementById<T extends Element>(type: { new(): T }, id:string): T {
        const element = this.document.getElementById(id);
        if (!element) {
            throw new Error(`Element with id '${id}' not found`);
        }
        if (element instanceof type) {
            return element;
        }
        throw new Error(`Element with id '${id}' is not of type ${type.name}`);
    }

    getButtonById(id: string): HTMLButtonElement {
        return this.getTypedElementById(HTMLButtonElement, id);
    }

    getCanvas(): VitternsCanvas {
        return new VitternsCanvas(this.getTypedElementById(HTMLCanvasElement, 'canvas'));
    }

    addEventListener(type: VitternsWindowEvent, listener: (...args:any) => void): void {
        this.window.addEventListener(type, listener);
    }

    milliseconds(): number {
        return window.performance.now();
    }
}


class VitternsCanvas {
    private ctx: CanvasRenderingContext2D;

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    resize(): VitternsCanvas {
        const size: Vector2D<number> = new Vector2D(window.innerWidth, window.innerHeight);
        console.log(`Resizing canvas from '${this.canvas.width}x${this.canvas.height}' to '${size.x}x${size.y}'`);
        let x = Math.max(100, size.x - 100);
        let y = Math.max(100, size.y - 100);
        var min = Math.min(x, y);
        this.canvas.width = min;
        this.canvas.height = min;
        return this;
    }

    clear(): VitternsCanvas {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    fill(color:Color): VitternsCanvas {
        this.ctx.fillStyle = color.hex();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    rect(position:Vector2D<number>, size:Vector2D<number>, color:Color): VitternsCanvas {
        this.ctx.fillStyle = color.hex();
        this.ctx.fillRect(position.x, position.y, size.x, size.y);
        return this;
    }

    text(text:string, position:Vector2D<number>, size:number, color:Color): VitternsCanvas {
        this.ctx.font = `${size}px Arial`;
        this.ctx.fillStyle = color.hex();
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, position.x, position.y);
        return this;
    }

    size(): Vector2D<number>;

    size(size: Vector2D<number>): VitternsCanvas;
    size(width: number, height: number): VitternsCanvas;

    size(...parameters:any): VitternsCanvas|Vector2D<number> {
        var vector:Vector2D<number>|null = null;

        if (parameters.length === 0) {
            return new Vector2D(this.canvas.width, this.canvas.height);
        } else if (parameters.length === 1) {
            console.log(`Setting size to: ${parameters}`);
            vector = as([Vector2D<number>], parameters)(
                (size: Vector2D<number>) => size
            ) as Vector2D<number>;
        } else if (parameters.length === 2) {
            console.log(`Setting size to: ${parameters}`);
            vector = as([Number, Number], parameters)(
                (width: Number, height: Number) => new Vector2D(width as number, height as number)
            ) as Vector2D<number>;
        } else {
            throw new Error(`Not implemented for parameters: ${parameters}`);
        }
        if (!vector) {
            throw new Error(`Invalid parameters: ${parameters}`);
        }
        this.canvas.height = vector.y;
        this.canvas.width = vector.x;
        return this;
    }
}

const vitterns = new VitternsDocument(document, window);