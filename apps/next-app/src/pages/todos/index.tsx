import React, { useState } from 'react'

import { Button } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'

import { useTodos } from '../../hooks/useTodos'

const Todos = () => {
  const [readerError] = useState(false)
  const { data } = useTodos()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{readerError && 'hello'}</p>
        {data?.map((todo) => (
          <Link
            href="/todos/[id]"
            as={`/todos/${todo.id}`}
            passHref
            key={todo.id}
          >
            <Button variant="contained">{todo.title}</Button>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default Todos
