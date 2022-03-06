import { body, ValidationChain } from 'express-validator';

export const todoValidationRules = (): ValidationChain[] => [
  body('title').isString().isLength({ min: 5 }),
];
