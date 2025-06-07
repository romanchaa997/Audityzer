/**
 * Response Utilities
 * 
 * Provides standardized response formatting for the API
 */

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {Object|Array} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Optional success message
 */
export const sendSuccess = (res, data, statusCode = 200, message = null) => {
  const response = {
    success: true
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    // If data is an object with a single key that matches the endpoint name,
    // merge it directly into the response
    if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 1) {
      Object.assign(response, data);
    } else {
      response.data = data;
    }
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a paginated response
 * @param {Object} res - Express response object
 * @param {Array} items - Array of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export const sendPaginated = (res, items, page, limit, total, statusCode = 200) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;

  return res.status(statusCode).json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrevious,
      nextPage: hasNext ? page + 1 : null,
      previousPage: hasPrevious ? page - 1 : null
    }
  });
};