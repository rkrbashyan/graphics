import fs from "node:fs/promises";
import { Vec2, Vec4, Vec3 } from "./math.js";

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
                // https://x.com/XorDev/status/1986071686785986848
                // for(float i,z,d,h;i++<8e1;o+=vec4(9,5,h+t,1)/d)
                // {
                //     vec3 p=z*normalize(FC.rgb*2.-r.xyy),a;
                //     p.z+=9.;
                //     a=mix(dot(a+=.5,p)*a,p,sin(h=dot(p,p/p)-t))+cos(h)*cross(a,p);
                //     for(d=0.;d++<9.;a+=.3*sin(a*d).zxy);z+=d=length(a.xz)/15.;
                // }
                // o=tanh(o/1e4);
                //////////////////////////////

                let o = new Vec4();
                const FC = new Vec3(x, y, 0);
                let i = 0;
                let z = 0;
                let d = 0;
                let h = 0;

                for (; i < 8e1; i++) {
                    let p = FC.multScalar(2.0)
                        .subtract(r.xyy())
                        .normalize()
                        .multScalar(z);
                    let a = new Vec3();

                    p.z += 9.0;
                    h = p.x + p.y + p.z - t;
                    a = a.addScalar(0.5);
                    const dotAP = a.dot(p);
                    a = Vec3.mix(a.multScalar(dotAP), p, Math.sin(h)).add(
                        Vec3.cross(a, p).multScalar(Math.cos(h))
                    );

                    for (d = 0; d < 9; d++) {
                        a = a.add(a.multScalar(d).sin().zxy().multScalar(0.3));
                    }

                    d = a.xz().length() / 15.0;
                    z += d;

                    if (d !== 0) {
                        o = o.add(new Vec4(9, 5, h + t, 1).divideScalar(d));
                    }
                }

                o = o.divideScalar(1e4).tanh();

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
