# Audityzer Assets

This directory contains visual assets for the Audityzer project.

## Important Notice

The current images and assets in this directory are placeholders. You should replace them with actual screenshots, diagrams, and visualizations of your Audityzer implementation.

## Directories

- **demo/** - Contains demo GIFs and videos
- **img/** - Contains images, diagrams, and screenshots
  - **screenshots/** - Contains UI screenshots and examples

## How to Replace Placeholder Images

1. Create actual screenshots of your Audityzer implementation
2. Create diagrams showing your security testing workflows
3. Replace the placeholder files with your actual images while keeping the same filenames
4. Ensure images are web-optimized (compressed JPG/PNG files, optimized GIFs)

## Creating the Demo GIF

You can use the included script to create your own demo GIF:

```bash
# For Linux/macOS
./create-quickstart-gif.sh

# For Windows
create-demo-gif.bat
```

## Required Assets

At minimum, you should replace:

1. `img/Audityzer-banner.png` - Project banner/logo
2. `demo/demo.gif` - Main demo animation
3. `img/test-interface-example.png` - Screenshot of the testing interface
4. Key visualization diagrams:
   - `img/bridge-testing-diagram.png`
   - `img/wallet-matrix-testing.png`
   - `img/test-execution-example.png`

## Directory Structure

- `img/` - Contains image assets like logo, banner, etc.
- `demo/` - Contains demo GIFs and videos

## Required Files

For the landing page to display correctly, please add the following files:

1. `img/Audityzer-banner.png` - Banner image for OpenGraph and Twitter previews
2. `favicon.png` - Favicon for browser tabs
3. `demo/demo.gif` - Demo animation (can be generated using the create-quickstart-gif.sh script)

## How to Generate Assets

1. For the demo GIF, run:

   ```bash
   ./create-quickstart-gif.sh
   ```

2. For optimizing images before uploading:

   - Use tools like TinyPNG (https://tinypng.com/) for PNG files
   - Use tools like SVGOMG (https://jakearchibald.github.io/svgomg/) for SVG files

3. For favicon generation:
   - Use tools like Favicon.io (https://favicon.io/) or RealFaviconGenerator (https://realfavicongenerator.net/)
