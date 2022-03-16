import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTokenStore } from 'src/store/useTokenStore';

export const useSaveTokensFromQueryParams = () => {
  const { query: params, push } = useRouter();
  useEffect(() => {
    if (typeof params.accessToken === 'string' && params.accessToken) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
      });
    }
  }, [params, push]);
};
