/**
 * File Path Utilities
 * 
 * Provides utility functions for working with file paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the absolute path to the uploads directory
 * @returns {string} Absolute path to uploads directory
 */
export const getUploadsDir = () => {
  const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  return uploadsDir;
};

/**
 * Get the absolute path to a file in the uploads directory
 * @param {string} filename - Name of the file
 * @returns {string} Absolute path to the file
 */
export const getUploadFilePath = (filename) => {
  return path.join(getUploadsDir(), filename);
};

/**
 * Check if a file exists in the uploads directory
 * @param {string} filename - Name of the file
 * @returns {boolean} True if the file exists, false otherwise
 */
export const fileExists = (filename) => {
  return fs.existsSync(getUploadFilePath(filename));
};

/**
 * Get file information
 * @param {string} filename - Name of the file
 * @returns {Object} File information object
 */
export const getFileInfo = (filename) => {
  const filePath = getUploadFilePath(filename);
  const stats = fs.statSync(filePath);
  
  return {
    name: filename,
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    type: path.extname(filename).slice(1)
  };
};