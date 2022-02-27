import React from 'react'
import Head from 'next/head'
import { Button } from 'ui'

const Home = () => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div className="h-12 w-12 bg-yellow-200" />
      <Button />
    </main>
  </div>
)

export default Home
