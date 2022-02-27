import 'reflect-metadata';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';

import { IS_PROD } from './utils/constants';
import { User } from './entities/User';
import { createConnection } from './utils/createConnection';
import { loadEnviornment } from './utils/enviornment';

const main = async () => {
  loadEnviornment();

  const app = express();

  const port = Number(process.env.SERVER_PORT) || 8000;

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  const store = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  const connection = await createConnection();

  const userRepo = connection.getRepository(User);

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year,
        httpOnly: true,
        secure: IS_PROD,
        sameSite: 'lax',
        domain: IS_PROD ? process.env.DOMAIN : undefined,
      },
    }),
  );

  app.get('*', (_, res) => {
    res.sendStatus(404);
  });

  app.get('/', (_req, res) => {
    res.send('hello world!');
  });

  app.get('/api/users', async (_, res) => {
    const users = await userRepo.find();
    res.json(users);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port http://localhost:${port}!`);
  });
};

// eslint-disable-next-line no-console
main().catch(err => console.error(`[ERROR]: ${err.message}`));
