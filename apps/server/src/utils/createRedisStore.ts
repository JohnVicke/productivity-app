import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

export const createRedisStore = () => {
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL, {
    password: process.env.REDIS_PASSWORD,
  });

  return new RedisStore({
    client: redis,
    disableTouch: true,
  });
};
