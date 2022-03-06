import cors from 'cors';
import express, { Application, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { Connection } from 'typeorm';
import {
  deserializeUser,
  getGoogleLogin,
  getGoogleRegister,
  getGoogleStrategy,
  serializeUser,
} from './passport';
import { createApiRouter, createAuthRouter } from './routers';
import { AuthConfig } from './types/AuthConfig';
import { IS_PROD } from './utils/constants';
import { createConnection } from './utils/createConnection';
import { createRedisStore } from './utils/createRedisStore';

interface ServerConfig {
  auth: AuthConfig;
}

export class Server {
  private app: Application;
  private connection: Connection;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = express();
    this.connectDatabase();
    this.configuration();
    this.setupRoutes();
  }

  public configuration() {
    const store = createRedisStore();
    this.app.set('port', Number(process.env.PORT) || 8000);
    if (!IS_PROD) this.app.use(morgan('dev'));

    this.app.use(
      cors({
        origin: [/http:\/\/localhost:(3000|8080)$/],
        credentials: true,
      }),
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        name: process.env.COOKIE_NAME,
        secret: process.env.COOKIE_SECRET || 'keyboard cat',
        store,
        saveUninitialized: true,
        resave: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year,
          httpOnly: true,
          secure: IS_PROD,
          sameSite: 'lax',
          domain: IS_PROD ? process.env.DOMAIN : undefined,
        },
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.configurePassport(this.config.auth);
  }

  private configurePassport(config: AuthConfig) {
    passport.use(getGoogleStrategy(config, '/auth/google/register/callback'));
    passport.use('google-register', getGoogleRegister(config));
    passport.use('google-login', getGoogleLogin(config));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
  }

  private async connectDatabase() {
    try {
      this.connection = await createConnection();
    } catch (error) {
      throw new Error('Databased failed to connect');
    }
  }

  private setupRoutes() {
    this.app.get('/', (_, res: Response) => {
      res.json('hello world');
    });

    this.app.use('/api', createApiRouter());
    this.app.use('/auth', createAuthRouter());

    this.app.get('*', (_, res: Response) => {
      res.send(404);
    });
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening on port ${this.app.get('port')}`);
    });
  }
}
