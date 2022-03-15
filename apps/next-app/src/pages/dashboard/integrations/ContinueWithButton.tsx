import React from 'react';
import Image from 'next/image';
import { ArrowRight } from '@mui/icons-material';
import { styled, Paper, PaperProps, Box, Typography } from '@mui/material';

interface ContinueWithButtonProps {
  text: string;
  image: {
    path: string;
    alt: string;
  };
}

const IntegrationPaper = styled(Paper)<PaperProps>(() => ({
  display: 'inline-block',
  maxWidth: '280px',
  width: '100%',
  padding: 5,
  cursor: 'pointer',
  transition: '.2s ease-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const ContinueWithButton: React.FC<ContinueWithButtonProps> = ({
  text,
  image,
}) => (
  <IntegrationPaper elevation={0}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image src={image.path} alt={image.alt} width="30" height="30" />
        <Typography
          sx={{ marginLeft: 2 }}
        >{`Continue with ${text}`}</Typography>
      </Box>
      <ArrowRight />
    </Box>
  </IntegrationPaper>
);
