import { Request, RequestHandler, Response, Router } from 'express';
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
    this.router.get('/me', this.me);
    this.router.get('/third-party-integrations', this.thirdPartyIntegrations);
  }

  private thirdPartyIntegrations = async (req: Request, res: Response) => {
    try {
      assertUserId(req);

      const user = await User.findOne({
        where: { id: req.user.id },
        select: ['googleId'],
      });

      if (!user) {
        return res.send(500);
      }

      const ids = ['googleId'];

      const verifiedIntegrations = ids.map(id => ({
        [id]: !!user[id as 'googleId'],
      }));

      return res.json(verifiedIntegrations);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  private me = async (req: Request, res: Response) => {
    try {
      assertUserId(req);
      const user = await User.findOne({
        where: { id: req.user.id },
        select: ['firstName', 'lastName'],
      });
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
