import { Request, RequestHandler, Response, Router } from 'express';
import passport from 'passport';

export class GoogleAuthController {
  private router: Router;

  constructor(private path: string, middlewares: RequestHandler[] = []) {
    this.router = Router();
    middlewares.forEach(middleware => this.router.use(middleware));
    this.addRoutes();
  }

  public register = (router: Router) => {
    router.use(this.path, this.router);
  };

  private addRoutes() {
    this.router.get('/register', this.authenticate());
    this.router.get('/register/callback', this.callback);
    this.router.get('/login', this.authenticate());
    this.router.get('/login/callback', this.callback);
    this.router.use('*', (_, res) => res.sendStatus(404));
  }

  private authenticate = () =>
    passport.authenticate('google', {
      scope: ['email', 'openid', 'profile'],
    });

  private callback = (req: Request, res: Response) => {
    passport.authenticate('google', { failWithError: true });
    const redirectPath = 'http://localhost:3000/registration-complete';
    res.redirect(`${redirectPath}`);
  };
}
