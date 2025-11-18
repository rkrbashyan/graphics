import fs from "node:fs/promises";

const factor = 100;
const width = 16 * factor;
const height = 9 * factor;
const pixels = Array.from({ length: height }, () => Array(width).fill(0));

async function generateFrames(frameStart, frameEnd) {
    for (let frame = frameStart; frame < frameEnd; frame++) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (
                    (Math.floor((x + frame) / factor) +
                        Math.floor((y + frame) / factor)) %
                    2
                ) {
                    pixels[y][x] = [0xff, 0x00, 0x00];
                } else {
                    pixels[y][x] = [0x00, 0x00, 0x00];
                }
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
        await generateFrames(msg.frameStart, msg.frameEnd);
        process.send({ status: "complete" });
        process.exit(0);
    } catch (error) {
        process.send({ status: "error", error: error.message });
        process.exit(1);
    }
});
