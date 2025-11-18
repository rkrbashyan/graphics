export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    yx() {
        return new Vec2(this.y, this.x);
    }

    xyy() {
        return new Vec3(this.x, this.y, this.y);
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

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    zxy() {
        return new Vec3(this.z, this.x, this.y);
    }

    xz() {
        return new Vec2(this.x, this.z);
    }

    addScalar(s) {
        return new Vec3(this.x + s, this.y + s, this.z + s);
    }

    multScalar(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    normalize() {
        const length = Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z
        );
        if (length === 0) return new Vec3(0, 0, 0);
        return new Vec3(this.x / length, this.y / length, this.z / length);
    }

    add(vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    multiply(vec) {
        return new Vec3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }

    divide(vec) {
        return new Vec3(this.x / vec.x, this.y / vec.y, this.z / vec.z);
    }

    subtract(vec) {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    sin() {
        return new Vec3(Math.sin(this.x), Math.sin(this.y), Math.sin(this.z));
    }

    static cross(vec1, vec2) {
        return new Vec3(
            vec1.y * vec2.z - vec1.z * vec2.y,
            vec1.z * vec2.x - vec1.x * vec2.z,
            vec1.x * vec2.y - vec1.y * vec2.x
        );
    }

    static mix(vec1, vec2, t) {
        return new Vec3(
            vec1.x * (1 - t) + vec2.x * t,
            vec1.y * (1 - t) + vec2.y * t,
            vec1.z * (1 - t) + vec2.z * t
        );
    }
}

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

    divideScalar(s) {
        return new Vec4(this.x / s, this.y / s, this.z / s, this.w / s);
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
