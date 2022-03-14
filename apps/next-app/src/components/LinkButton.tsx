import { Button, ButtonProps } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface LinkButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  ...rest
}) => (
  <Link href={href as string} passHref>
    <Button {...rest}>{children}</Button>
  </Link>
);
