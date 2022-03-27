import { Request, Response, NextFunction, RequestHandler } from 'express';
import { logger } from '../utils/logger';

export const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.isAuthenticated()) {
    logger.info('[AUTH] user is not authenticated');
    return res.sendStatus(401);
  }

  return next();
};
