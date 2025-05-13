const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const QUALITY = 85; // WebP quality (0-100)
const SOURCE_DIRS = ['assets/img']; // Directories containing images to convert
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

/**
 * Convert a single image to WebP format
 * @param {string} inputPath - The path to the source image
 */
async function convertToWebP(inputPath) {
  try {
    const outputPath = getOutputPath(inputPath);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Skip if WebP already exists and is newer than source
    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);
      if (outputStat.mtime > inputStat.mtime) {
        console.log(`Skipping ${inputPath} (WebP already exists and is up-to-date)`);
        return;
      }
    }
    
    // Convert image to WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    console.log(`Converted ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}: ${error.message}`);
  }
}

/**
 * Get the output path for the WebP version of an image
 * @param {string} inputPath - The path to the source image
 * @returns {string} The path where the WebP image should be saved
 */
function getOutputPath(inputPath) {
  const parsedPath = path.parse(inputPath);
  return path.join(parsedPath.dir, parsedPath.name + '.webp');
}

/**
 * Find all images matching the configured extensions in the source directories
 * @returns {Promise<string[]>} Array of file paths
 */
function findImages() {
  return new Promise((resolve, reject) => {
    let allImages = [];
    
    SOURCE_DIRS.forEach(dir => {
      EXTENSIONS.forEach(ext => {
        const pattern = path.join(dir, `**/*${ext}`);
        const images = glob.sync(pattern);
        allImages = allImages.concat(images);
      });
    });
    
    resolve(allImages);
  });
}

/**
 * Main process to convert all images
 */
async function processImages() {
  try {
    console.log('Starting image conversion to WebP...');
    
    const images = await findImages();
    console.log(`Found ${images.length} images to process`);
    
    // Convert images sequentially to avoid memory issues
    for (const imagePath of images) {
      await convertToWebP(imagePath);
    }
    
    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the conversion process
processImages(); 