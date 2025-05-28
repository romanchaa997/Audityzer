/**
 * MCP File Routes
 * 
 * Handles file-related operations for the MCP server.
 */

import path from 'path';
import multer from 'multer';
import { MCP_ENDPOINTS, MCP_CONFIG } from '../config.js';
import { validateParams } from '../middleware/validation.js';
import { fileParamSchema } from '../schemas/file-schemas.js';
import {
  getFiles,
  uploadFile,
  downloadFile,
  deleteFile
} from '../controllers/file-controller.js';
import { getUploadsDir } from '../utils/file-paths.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getUploadsDir());
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MCP_CONFIG.MAX_FILE_SIZE
  }
});

/**
 * Set up file routes
 * @param {Object} router - Express router instance
 */
const setupFileRoutes = (router) => {
  // Get file list
  router.get(MCP_ENDPOINTS.API.FILES, getFiles);

  // Upload file
  router.post(
    `${MCP_ENDPOINTS.API.FILES}/upload`,
    upload.single('file'),
    uploadFile
  );

  // Download file
  router.get(
    `${MCP_ENDPOINTS.API.FILES}/download/:filename`,
    validateParams(fileParamSchema),
    downloadFile
  );

  // Delete file
  router.delete(
    `${MCP_ENDPOINTS.API.FILES}/:filename`,
    validateParams(fileParamSchema),
    deleteFile
  );
};

export { setupFileRoutes };
export default setupFileRoutes;