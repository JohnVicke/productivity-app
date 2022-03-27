import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import Head from 'next/head';
import theme from 'styles/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getQueryClient } from 'src/lib/queryClient';
import { ToastController } from 'src/modules/toast/ToastController';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = useState(getQueryClient(router));
  return (
    <>
      <Head>
        <title>Productivity Thingy majingy</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastController />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
