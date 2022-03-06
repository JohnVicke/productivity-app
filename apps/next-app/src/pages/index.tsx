import React from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useLogin } from 'src/hooks/useLogin'

const Home = () => {
  const { refetch } = useLogin('google', false)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button variant="contained" onClick={() => refetch()}>
          Go To todos
        </Button>
      </main>
    </div>
  )
}
export default Home
