import { Button } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useTodos } from '../../hooks/useTodos'

const Todos = () => {
  const { data } = useTodos()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
