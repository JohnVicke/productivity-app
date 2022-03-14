import { Request, Response, NextFunction, RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.isAuthenticated()) {
    console.log('[AUTH] user is not authenticated');
    return res.sendStatus(401);
  }

  return next();
};
