/**
 * Analysis Validation Schemas
 */

import Joi from 'joi';

/**
 * Vulnerability scan schema
 */
export const vulnerabilityScanSchema = Joi.object({
  target: Joi.string().required().messages({
    'string.empty': 'Target cannot be empty',
    'any.required': 'Target is required'
  }),
  scanType: Joi.string().valid('quick', 'standard', 'comprehensive').default('comprehensive')
});

/**
 * Security report schema
 */
export const securityReportSchema = Joi.object({
  scanId: Joi.string().required().messages({
    'string.empty': 'Scan ID cannot be empty',
    'any.required': 'Scan ID is required'
  }),
  format: Joi.string().valid('json', 'pdf', 'html', 'csv').default('json'),
  includeRecommendations: Joi.boolean().default(true)
});

/**
 * Code fix schema
 */
export const codeFixSchema = Joi.object({
  vulnerabilityId: Joi.string().required().messages({
    'string.empty': 'Vulnerability ID cannot be empty',
    'any.required': 'Vulnerability ID is required'
  }),
  code: Joi.string().required().messages({
    'string.empty': 'Code cannot be empty',
    'any.required': 'Code is required'
  }),
  language: Joi.string().default('javascript')
});