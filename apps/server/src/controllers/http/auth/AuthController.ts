import { Request, RequestHandler, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';
import { assertUserId } from '../../../utils/assertUserId';

const GOOGLE_SCOPE = [
  'email',
  'openid',
  'profile',
  'https://www.googleapis.com/auth/gmail.readonly',
];
const GOOGLE_PROMPT_SELECT_ACCOUNT = 'select_account';

export class AuthController {
  private router: Router;

  constructor(private path: string, middlewares: RequestHandler[] = []) {
    this.router = Router();
    middlewares.forEach(middleware => this.router.use(middleware));
    this.addRoutes();
  }

  public register = (parentRouter: Router) => {
    parentRouter.use(this.path, this.router);
  };

  private addRoutes = () => {
    this.router.get(
      '/google/register',
      this.authenticate(
        'google-register',
        GOOGLE_SCOPE,
        GOOGLE_PROMPT_SELECT_ACCOUNT,
      ),
    );
    this.router.get(
      '/google/register/callback',
      this.callback('google-register'),
    );
    this.router.get(
      '/google/login',
      this.authenticate(
        'google-login',
        GOOGLE_SCOPE,
        GOOGLE_PROMPT_SELECT_ACCOUNT,
      ),
    );

    this.router.get('/google/login/callback', this.callback('google-login'));

    this.router.get('/accessToken', isAuthenticated, this.accessToken);

    this.router.get('/logout', this.logout);
    this.router.use('*', (_, res) => res.sendStatus(404));
  };

  private authenticate = (strategy: string, scope: string[], prompt?: string) =>
    passport.authenticate(strategy, { scope, prompt });

  private callback = (strategy: string) => {
    const authenticator = passport.authenticate(strategy, {
      failWithError: true,
    });

    const successHandler: RequestHandler = async (req, res) => {
      const redirectPath = `http://localhost:3000/registration-complete`;
      return res.redirect(redirectPath);
    };

    return [authenticator, successHandler];
  };

  private destroyCookie = (req: Request, res: Response) =>
    new Promise((resolve, reject) => {
      req.session.destroy(error => {
        res.clearCookie(process.env.COOKIE_NAME);
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      });
    });

  private logout = async (req: Request, res: Response) => {
    req.logout();
    await this.destroyCookie(req, res);

    const { redirectUrl } = req.query;

    if (redirectUrl) {
      return res.redirect(redirectUrl as string);
    }

    return res.json('Logged out');
  };

  private accessToken = (req: Request, res: Response) => {
    assertUserId(req);
    res.json({
      accessToken: jwt.sign(
        { id: req.user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '8h' },
      ),
    });
  };
}
