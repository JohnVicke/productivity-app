import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@mui/material';
import { loginWithGoogle } from 'src/utils/auth';

const Login: NextPage = () => {
  console.log('hello');
  return (
    <div>
      <Button onClick={loginWithGoogle}>Continue with google</Button>
      <Link href="/todos" passHref>
        <Button onClick={loginWithGoogle}>Go to todos</Button>
      </Link>
    </div>
  );
};

export default Login;
