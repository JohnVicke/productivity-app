import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (id: number) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });
