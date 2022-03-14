import { Router } from 'express';
import { AuthController } from '../controllers/http/auth/AuthController';

export const createAuthRouter = (): Router => {
  const router = Router();
  const controllers = [new AuthController('/')];

  controllers.forEach(controller => controller.register(router));

  router.get('/', (_, res) => res.send('hello world'));
  router.use('*', (_, res) => res.sendStatus(404));
  return router;
};
