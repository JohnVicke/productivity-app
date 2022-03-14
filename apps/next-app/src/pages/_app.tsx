import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import Head from 'next/head';
import theme from 'styles/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import { HttpError } from 'src/utils/HttpError';
import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = useState(
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
    })
  );
  return (
    <>
      <Head>
        <title>Productivity Thingy majingy</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
