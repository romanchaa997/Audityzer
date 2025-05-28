/**
 * File Controller
 */

import fs from 'fs';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/error-handler.js';
import { sendSuccess } from '../utils/response.js';
import {
  getUploadsDir,
  getUploadFilePath,
  fileExists,
  getFileInfo
} from '../utils/file-paths.js';

/**
 * Get list of uploaded files
 * @param {Object} req - Express request object (unused)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getFiles = (req, res, next) => {
  try {
    const uploadDir = getUploadsDir();

    // Read directory contents
    const files = fs.readdirSync(uploadDir)
      .filter(file => !file.startsWith('.'))
      .map(file => getFileInfo(file));

    sendSuccess(res, { files });
  } catch (error) {
    next(ApiError.internal('Failed to list files', 'FILE_LIST_ERROR'));
  }
};

/**
 * Upload a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      throw ApiError.badRequest('No file uploaded', 'NO_FILE');
    }

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    };

    logger.info(`File uploaded: ${fileInfo.originalName} (${fileInfo.size} bytes)`);

    sendSuccess(res, { file: fileInfo }, 201, 'File uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Download a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const downloadFile = (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = getUploadFilePath(filename);

    if (!fileExists(filename)) {
      throw ApiError.notFound('File not found', 'FILE_NOT_FOUND');
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        logger.error(`Error downloading file: ${err.message}`);
        return next(ApiError.internal('Failed to download file', 'FILE_DOWNLOAD_ERROR'));
      }

      logger.info(`File downloaded: ${filename}`);
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteFile = (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = getUploadFilePath(filename);

    if (!fileExists(filename)) {
      throw ApiError.notFound('File not found', 'FILE_NOT_FOUND');
    }

    fs.unlinkSync(filePath);

    logger.info(`File deleted: ${filename}`);

    sendSuccess(res, null, 200, 'File deleted successfully');
  } catch (error) {
    next(error);
  }
};