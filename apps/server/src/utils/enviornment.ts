import { config } from 'dotenv-safe';
import path from 'path';

export type Enivornment = 'test' | 'development' | 'production';

const getRootDir = () => path.resolve(__dirname, '..', '..', '..', '..', '..');

export const getEnviornment = (): Enivornment => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'development';

    case 'test':
      return 'test';

    case 'production':
      return 'production';

    default:
      return 'development';
  }
};

export const loadEnviornment = (): boolean => {
  const enviornment = getEnviornment();

  const envPath = enviornment === 'test' ? '.env.test' : '.env';
  const rootDir = getRootDir();

  const configOutput = config({
    example: `${rootDir}/.env.example`,
    path: `${rootDir}/${envPath}`,
    allowEmptyValues: false,
  });

  if (configOutput.error) {
    throw new Error(configOutput.error.message);
  }

  return true;
};
