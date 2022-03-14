import { Request, RequestHandler, Response, Router } from 'express';
import passport from 'passport';
import { User } from '../../../entities/User';
import { assertUserId } from '../../../utils/assertUserId';

export class UserController {
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
    this.router.get('/me', this.me());
  }

  private me = () => {
    const authenticator = passport.authenticate('token', {
      session: false,
      failWithError: true,
    });

    const successHandler = async (req: Request, res: Response) => {
      try {
        assertUserId(req);
        const user = await User.findOne({
          where: { id: req.user.id },
          select: ['firstName', 'lastName'],
        });
        res.json(user);
      } catch (error) {
        res.sendStatus(500).send(error);
      }
    };
    return [authenticator, successHandler];
  };
}
