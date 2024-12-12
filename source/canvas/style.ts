class Color {
    public static readonly MAX_8_BIT: number = 255;
    public static readonly MAX_16_BIT: number = 65535;
    public static readonly MAX_32_BIT: number = 4294967295;

    constructor(public r: number = 0, public g: number = 0, public b: number = 0, public a: number = 1) {}

    static rgb8(r: number, g: number, b: number): Color {
        return Color.rgb(r, g, b, Color.MAX_8_BIT);
    }

    static rgb16(r: number, g: number, b: number): Color {
        return Color.rgb(r, g, b, Color.MAX_16_BIT);
    }

    static rgb32(r: number, g: number, b: number): Color {
        return Color.rgb(r, g, b, Color.MAX_32_BIT);
    }

    public values(): [number, number, number] {
        return [this.r, this.g, this.b];
    }

    public hex(): string {
        const color = '#' + this.values()
            .map((v) => Math.floor(v * Color.MAX_8_BIT).toString(16).padStart(2, '0'))
            .join("");
        return color;
    }

    private static rgb(r: number, g: number, b: number, max: number): Color {
        r = Math.min(r, max);
        g = Math.min(g, max);
        b = Math.min(b, max);
        return new Color(r / max, g / max, b / max);
    }
}