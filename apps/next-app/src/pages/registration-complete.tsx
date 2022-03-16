import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useSaveTokensFromQueryParams } from 'src/hooks/useSaveTokensFromQueryParams';

const RegistrationComplete: NextPage = () => {
  useSaveTokensFromQueryParams();
  return (
    <div>
      <Link href="/todos" passHref>
        <Button>Go to todos</Button>
      </Link>
    </div>
  );
};

export default RegistrationComplete;
