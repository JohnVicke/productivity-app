import { NextRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { HttpError } from 'src/utils/HttpError';

export const getQueryClient = (router: NextRouter) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: (errorCount: number, error: any | HttpError) => {
          if (errorCount > 3) {
            return false;
          }
          if (error?.custom?.status === 401) {
            // Open login modal using context or simple error bus
            router.replace('/login');
            return false;
          }
          return true;
        },
      },
    },
  });
