import { useTheme } from '@mui/material';
import Head from 'next/head';
import React from 'react';

interface HeaderControllerProps {
  title?: string;
  description?: string;
  keyWords?: string[];
}

export const HeaderController: React.FC<HeaderControllerProps> = ({
  title,
  description = 'Organize, simplify and automate your worklife with ouTo',
  keyWords = [],
}) => {
  const theme = useTheme();
  return (
    <Head>
      {title ? <title>{title} | ouTo</title> : <title>ouTo</title>}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`ouTo, ouTo${keyWords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={theme.palette.primary.dark} />
    </Head>
  );
};
