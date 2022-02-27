import { config } from 'dotenv-safe';

export type Enivornment = 'test' | 'development' | 'production';

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

  const path = enviornment === 'test' ? '.env.test' : '.env';

  const configOutput = config({
    example: `${process.env.INIT_CWD}/.env.example`,
    path: `${process.env.INIT_CWD}/${path}`,
    allowEmptyValues: true,
  });

  if (configOutput.error) {
    throw new Error(configOutput.error.message);
  }

  return true;
};
