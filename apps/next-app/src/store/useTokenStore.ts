import create from 'zustand';
import { combine } from 'zustand/middleware';

import { isServer } from 'src/lib/isServer';

const accessTokenKey = '@pdol/token';

const getDefaultValues = () => {
  if (!isServer) {
    return {
      accessToken: localStorage.getItem(accessTokenKey) || '',
    };
  }
  return {
    accessToken: '',
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string }) => {
      localStorage.setItem(accessTokenKey, x.accessToken);
      set(x);
    },
  }))
);
