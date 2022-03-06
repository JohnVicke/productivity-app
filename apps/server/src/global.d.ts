import { Enivornment } from './utils/enviornment';

declare module 'express-session';

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    NODE_ENV: Enivornment;
    REDIS_URL: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    REDIS_PASSWORD: string;
    COOKIE_NAME: string;
    DOMAIN: string;
    COOKIE_SECRET: string;
  }
}
