import { Router } from 'express';
import { GoogleAuthController } from '../controllers/http/auth/GoogleAuthController';

export const createAuthRouter = (): Router => {
  console.log('Adding auth router');
  const router = Router();
  const controllers = [new GoogleAuthController('/google')];
  controllers.forEach(controller => controller.register(router));
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  router.get('/', (_, res) => res.send('hello world'));
  router.use('*', (_, res) => res.sendStatus(404));
  return router;
};
