/**
 * File Validation Schemas
 */

import Joi from 'joi';

/**
 * File parameter schema
 */
export const fileParamSchema = Joi.object({
  filename: Joi.string().required().messages({
    'string.empty': 'Filename cannot be empty',
    'any.required': 'Filename is required'
  })
});