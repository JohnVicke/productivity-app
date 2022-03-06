import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const inputValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.send(errors).status(422);
  }

  return next();
};
