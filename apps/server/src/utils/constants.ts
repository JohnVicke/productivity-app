export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const PORT = Number(process.env.PORT) || 8080;
