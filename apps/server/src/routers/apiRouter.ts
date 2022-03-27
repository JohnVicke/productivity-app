import { Router } from 'express';
import { TodoController } from '../controllers/http/api/TodoController';
import { UserController } from '../controllers/http/api/UserController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const createApiRouter = (): Router => {
  const router = Router();
  const controllers = [
    new UserController('/user', [isAuthenticated]),
    new TodoController('/todos', [isAuthenticated]),
  ];
  controllers.forEach(controller => controller.register(router));
  router.get('*', (_, res) => res.sendStatus(404));
  return router;
};
