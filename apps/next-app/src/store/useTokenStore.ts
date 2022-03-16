import create from 'zustand';
import { combine } from 'zustand/middleware';

import { isServer } from 'src/lib/isServer';

const accessTokenKey = '@pdol/token';

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || '',
      };
    } catch {}
  }
  return {
    accessToken: '',
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string }) => {
      try {
        console.log('setting token in store', x.accessToken);
        localStorage.setItem(accessTokenKey, x.accessToken);
      } catch {}
      set(x);
    },
  }))
);
