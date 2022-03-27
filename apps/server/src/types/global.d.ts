/* eslint-disable */
import express, { Request } from 'express';
import { SerializedUser } from '.';
import { Enivornment } from '../utils/enviornment';

declare global {
  namespace Express {
    type User = SerializedUser;
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: Enivornment;
      REDIS_URL: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      REDIS_PASSWORD: string;
      COOKIE_NAME: string;
      CORS_ORIGIN: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      SLACK_CLIENT_ID: string;
      SLACK_CLIENT_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
