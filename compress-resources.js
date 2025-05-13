const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const glob = require('glob');
const { promisify } = require('util');

// Promisify functions
const gzipAsync = promisify(zlib.gzip);
const brotliCompressAsync = promisify(zlib.brotliCompress);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

// Configuration
const BROTLI_OPTIONS = { 
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,  // Max compression
  }
};

const GZIP_OPTIONS = {
  level: 9  // Max compression
};

const EXTENSIONS_TO_COMPRESS = ['.js', '.css', '.html', '.svg', '.json'];
const DIRS_TO_COMPRESS = ['path/to/your/js', 'path/to/your/css', './']; // Adjust these paths

/**
 * Find all files matching the specified extensions
 * @returns {Promise<string[]>} Array of file paths
 */
function findFiles() {
  return new Promise((resolve, reject) => {
    let allFiles = [];
    
    // Add specific file patterns to compress
    DIRS_TO_COMPRESS.forEach(dir => {
      EXTENSIONS_TO_COMPRESS.forEach(ext => {
        const pattern = path.join(dir, `**/*${ext}`);
        const files = glob.sync(pattern);
        allFiles = allFiles.concat(files);
      });
    });
    
    // Remove duplicates
    allFiles = [...new Set(allFiles)];
    
    // Filter out already compressed files
    allFiles = allFiles.filter(file => !file.endsWith('.gz') && !file.endsWith('.br'));
    
    resolve(allFiles);
  });
}

/**
 * Compress a single file using both Gzip and Brotli
 * @param {string} filePath - Path to the file to compress
 */
async function compressFile(filePath) {
  try {
    const fileContent = await readFileAsync(filePath);
    const fileSize = fileContent.length;
    
    // Create Gzip version
    const gzipped = await gzipAsync(fileContent, GZIP_OPTIONS);
    await writeFileAsync(`${filePath}.gz`, gzipped);
    
    // Create Brotli version
    const brotli = await brotliCompressAsync(fileContent, BROTLI_OPTIONS);
    await writeFileAsync(`${filePath}.br`, brotli);
    
    // Calculate compression ratios
    const gzipRatio = (gzipped.length / fileSize * 100).toFixed(2);
    const brotliRatio = (brotli.length / fileSize * 100).toFixed(2);
    
    console.log(`Compressed ${filePath}:
      Original: ${fileSize} bytes
      Gzip:     ${gzipped.length} bytes (${gzipRatio}%)
      Brotli:   ${brotli.length} bytes (${brotliRatio}%)`);
      
  } catch (error) {
    console.error(`Error compressing ${filePath}: ${error.message}`);
  }
}

/**
 * Process all files for compression
 */
async function compressResources() {
  try {
    console.log('Starting resource compression...');
    
    const files = await findFiles();
    console.log(`Found ${files.length} files to compress`);
    
    // Compress files
    for (const filePath of files) {
      await compressFile(filePath);
    }
    
    console.log('Compression complete!');
  } catch (error) {
    console.error('Error processing compression:', error);
  }
}

// Run the compression process
compressResources(); 