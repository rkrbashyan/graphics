export class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    addScalar(s) {
        return new Vec4(this.x + s, this.y + s, this.z + s, this.w + s);
    }

    multScalar(scalar) {
        return new Vec4(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }

    negate() {
        return new Vec4(-this.x, -this.y, -this.z, -this.w);
    }

    add(vec) {
        return new Vec4(
            this.x + vec.x,
            this.y + vec.y,
            this.z + vec.z,
            this.w + vec.w
        );
    }

    subtract(vec) {
        return new Vec4(
            this.x - vec.x,
            this.y - vec.y,
            this.z - vec.z,
            this.w - vec.w
        );
    }

    divide(vec) {
        return new Vec4(
            this.x / vec.x,
            this.y / vec.y,
            this.z / vec.z,
            this.w / vec.w
        );
    }

    sin() {
        return new Vec4(
            Math.sin(this.x),
            Math.sin(this.y),
            Math.sin(this.z),
            Math.sin(this.w)
        );
    }

    exp() {
        return new Vec4(
            Math.exp(this.x),
            Math.exp(this.y),
            Math.exp(this.z),
            Math.exp(this.w)
        );
    }

    tanh() {
        return new Vec4(
            Math.tanh(this.x),
            Math.tanh(this.y),
            Math.tanh(this.z),
            Math.tanh(this.w)
        );
    }
}

export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    yx() {
        return new Vec2(this.y, this.x);
    }

    xyyx() {
        return new Vec4(this.x, this.y, this.y, this.x);
    }

    multScalar(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    divideScalar(s) {
        return new Vec2(this.x / s, this.y / s);
    }

    addScalar(s) {
        return new Vec2(this.x + s, this.y + s);
    }

    add(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    subtract(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    multiply(vec) {
        return new Vec2(this.x * vec.x, this.y * vec.y);
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    cos() {
        return new Vec2(Math.cos(this.x), Math.cos(this.y));
    }
}
