import { fork, spawn } from "node:child_process";
import os from "node:os";
import fs from "node:fs/promises";

const output = "checker"; // checker, plasma or whirl

const numCPUs = os.cpus().length;
const totalFrames = 240;
const framesPerWorker = Math.ceil(totalFrames / numCPUs);

console.log(`Using ${numCPUs} workers to generate ${totalFrames} frames`);

// Clear output directory before starting
await clearOutputDir();

const workers = [];
for (let i = 0; i < numCPUs; i++) {
    const frameStart = i * framesPerWorker;
    const frameEnd = Math.min((i + 1) * framesPerWorker, totalFrames);

    if (frameStart >= totalFrames) break;

    const worker = fork(`./${output}.js`);
    worker.send({ frameStart, frameEnd, totalFrames });
    workers.push(
        new Promise((resolve, reject) => {
            worker.on("message", (msg) => {
                if (msg.status === "complete") {
                    console.log(
                        `Worker completed frames ${frameStart}-${frameEnd}`
                    );
                    resolve();
                } else if (msg.status === "error") {
                    reject(new Error(msg.error));
                }
            });

            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker exited with code ${code}`));
                }
            });
        })
    );
}

// Wait for all workers to complete
try {
    await Promise.all(workers);
    console.log("All frames generated successfully");
    createVideo();
} catch (error) {
    console.error("Error generating frames:", error);
    process.exit(1);
}

function createVideo() {
    const ffmpeg = spawn("ffmpeg", [
        "-y",
        "-loglevel",
        "error",
        "-i",
        "output/output_%02d.ppm",
        "-r",
        "60",
        `./${output}.mp4`,
    ]);

    ffmpeg.on("close", (code) => {
        if (code === 0) {
            console.log("Video created successfully");
        } else {
            console.log(`ffmpeg process exited with code ${code}`);
        }
    });
}

async function clearOutputDir() {
    try {
        await fs.rm("./output", { recursive: true, force: true });
        await fs.mkdir("./output", { recursive: true });
        console.log("Output directory cleared");
    } catch (error) {
        console.error("Error clearing output directory:", error);
    }
}
