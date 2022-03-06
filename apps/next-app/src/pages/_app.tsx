import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'
import Head from 'next/head'
import theme from 'styles/theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    })
  )
  return (
    <>
      <Head>
        <title>Training log</title>
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
  )
}

export default MyApp
