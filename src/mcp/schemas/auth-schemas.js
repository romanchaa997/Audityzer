/**
 * Authentication Validation Schemas
 */

import Joi from 'joi';

/**
 * Login request schema
 */
export const loginSchema = Joi.object({
  apiKey: Joi.string().required().messages({
    'string.empty': 'API key cannot be empty',
    'any.required': 'API key is required'
  })
});

/**
 * Token verification schema
 */
export const verifyTokenSchema = Joi.object({
  token: Joi.string().required().messages({
    'string.empty': 'Token cannot be empty',
    'any.required': 'Token is required'
  })
});