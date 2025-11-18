https://github.com/user-attachments/assets/a220964c-f49e-4aa0-89e4-76eca6f612c3

https://github.com/user-attachments/assets/8dcc73a4-410c-40bb-a621-c83a20f8e34c

# Graphics Renderer

A multi-process Node.js application that generates animated graphics frames in parallel and compiles them into a video using [FFmpeg](https://www.ffmpeg.org/).

-   Inspired by [rexim](https://gist.github.com/rexim/ef86bf70918034a5a57881456c0a0ccf)
-   Plasma by [Xor](https://x.com/XorDev/status/1894123951401378051)

## Features

-   **Parallel Processing**: Utilizes all CPU cores via `child_process.fork()` to generate frames concurrently
-   **PPM Format**: Generates frames in PPM (Portable Pixmap) format
-   **Video Compilation**: Automatically converts frames to MP4 using FFmpeg
-   **Multiple Effects**: Supports different animation styles (plasma, checker)

## Prerequisites

-   Node.js
-   FFmpeg installed and available in PATH

## Usage

Run the animation generator:

```bash
node main.js
```

## Configuration

Edit `main.js` to customize:

```javascript
const output = "plasma"; // Animation type: "plasma" or "checker"
const totalFrames = 240; // Number of frames to generate
```

## How It Works

1. **Main Process** (`main.js`):

    - Clears the output directory
    - Forks multiple worker processes (one per CPU core)
    - Distributes frame generation across workers
    - Waits for all workers to complete
    - Compiles frames into video using FFmpeg

2. **Worker Process** (`plasma.js` / `checker.js`):

    - Receives frame range via IPC
    - Generates assigned frames
    - Writes PPM files to `./output/`
    - Reports completion status to parent

3. **Math Utilities** (`math.js`):
    - Provides vector math operations (Vec2, Vec4)
    - Used for shader-like computations

## Output

-   Frames: `./output/output_00.ppm`, `output_01.ppm`, etc.
-   Video: `./plasma.mp4` (or `checker.mp4` depending on configuration)

## Performance

Frame generation is parallelized across all CPU cores, significantly reducing render time for large frame counts.
