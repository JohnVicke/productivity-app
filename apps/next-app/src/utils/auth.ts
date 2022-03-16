import { Api } from 'src/lib/api';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const register = (provider: string) => {
  window.open(`${NEXT_PUBLIC_BASE_URL}/auth/${provider}/register`, '_self');
};

const login = (provider: string) => {
  window.open(
    `${NEXT_PUBLIC_BASE_URL}/auth/${provider}/login?redirectUrl=http://localhost:3000`,
    '_self'
  );
};

export const registerWithGoogle = () => {
  register('google');
};

export const loginWithGoogle = () => {
  login('google');
};

export const logout = async () => {
  const test = await Api.get('auth/logout');
};
