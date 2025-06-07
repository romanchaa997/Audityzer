/**
 * Contract Validation Schemas
 */

import Joi from 'joi';

/**
 * Contract address parameter schema
 */
export const contractAddressParamSchema = Joi.object({
  address: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required()
    .messages({
      'string.empty': 'Contract address cannot be empty',
      'string.pattern.base': 'Invalid contract address format',
      'any.required': 'Contract address is required'
    })
});

/**
 * Contract analysis schema
 */
export const contractAnalysisSchema = Joi.object({
  address: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/),
  source: Joi.string(),
  bytecode: Joi.string().pattern(/^0x[a-fA-F0-9]*$/),
  network: Joi.string().default('mainnet')
}).or('address', 'source', 'bytecode').messages({
  'object.missing': 'At least one of address, source, or bytecode is required'
});

/**
 * Contract verification schema
 */
export const contractVerificationSchema = Joi.object({
  address: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .required()
    .messages({
      'string.empty': 'Contract address cannot be empty',
      'string.pattern.base': 'Invalid contract address format',
      'any.required': 'Contract address is required'
    }),
  source: Joi.string().required().messages({
    'string.empty': 'Source code cannot be empty',
    'any.required': 'Source code is required'
  }),
  compilerVersion: Joi.string().default('0.8.17'),
  optimizationEnabled: Joi.boolean().default(false),
  runs: Joi.number().integer().min(1).default(200)
});