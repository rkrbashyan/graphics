import fs from "node:fs/promises";
import { Vec2, Vec4 } from "./math.js";

const factor = 100;
const width = 16 * factor;
const height = 9 * factor;
const pixels = Array.from({ length: height }, () => Array(width).fill(0));

async function generateFrames(frameStart, frameEnd, totalFrames) {
    const r = new Vec2(width, height);

    for (let frame = frameStart; frame < frameEnd; frame++) {
        const t = (frame / totalFrames) * 2 * Math.PI;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                //////////////////////////////
                // https://x.com/XorDev/status/1894123951401378051
                //////////////////////////////
                let o = new Vec4();
                const FC = new Vec2(x, y);
                const p = FC.multScalar(2.0).subtract(r).divideScalar(r.y);
                const l = new Vec2(
                    4.0 - 4.0 * Math.abs(0.7 - p.dot(p)),
                    4.0 - 4.0 * Math.abs(0.7 - p.dot(p))
                );
                let v = p.multiply(l);
                const i = new Vec2();
                const q = new Vec4(-1, 1, 2, 0);

                for (
                    ;
                    i.y++ < 8.0;
                    o = o.add(
                        v
                            .xyyx()
                            .sin()
                            .addScalar(1.0)
                            .multScalar(Math.abs(v.x - v.y))
                    )
                ) {
                    v = v.add(
                        v
                            .yx()
                            .multScalar(i.y)
                            .add(i)
                            .addScalar(t)
                            .cos()
                            .divideScalar(i.y)
                            .addScalar(0.7)
                    );
                }

                o = q
                    .negate()
                    .multScalar(p.y)
                    .addScalar(l.x - 4.0)
                    .exp()
                    .multScalar(5.0)
                    .divide(o)
                    .tanh();

                pixels[y][x] = [o.x * 255, o.y * 255, o.z * 255];
            }
        }

        // Combine header and pixel data into a single buffer
        const fileName = `./output/output_${frame
            .toString()
            .padStart(2, "0")}.ppm`;
        const header = `P6\n${width} ${height}\n255\n`;
        const headerBuffer = Buffer.from(header, "utf-8");
        const pixelBuffer = Buffer.from(pixels.flat(2));
        const fileData = Buffer.concat([headerBuffer, pixelBuffer]);

        await fs.writeFile(fileName, fileData);
    }
}

// Listen for messages from parent process
process.on("message", async (msg) => {
    try {
        await generateFrames(msg.frameStart, msg.frameEnd, msg.totalFrames);
        process.send({ status: "complete" });
        process.exit(0);
    } catch (error) {
        process.send({ status: "error", error: error.message });
        process.exit(1);
    }
});
