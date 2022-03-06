import { Router } from 'express';
import { TodoController } from '../controllers/http/api/TodoController';

export const createApiRouter = (): Router => {
  console.log('Adding api router');
  const router = Router();
  const controllers = [new TodoController('/todos')];
  controllers.forEach(controller => controller.register(router));
  router.get('*', (_, res) => res.sendStatus(404));
  return router;
};
