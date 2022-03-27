import { Box, styled, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { IPageInformation } from 'src/types/LayoutTypes';

const Title = styled(Typography)<TypographyProps>(() => ({
  cursor: 'pointer',
  position: 'relative',
  '&:before': {
    content: "''",
    position: 'absolute',
    width: 2,
    height: '100%',
    left: -5,
    backgroundColor: '#fff',
    visibility: 'hidden',
  },
  '&:hover': {
    opacity: 0.6,
    '&:before': {
      visibility: 'visible',
    },
  },
}));

export interface PageInformationProps {
  items?: IPageInformation[];
}

export const PageInformation: React.FC<PageInformationProps> = ({ items }) => (
  <Box display="flex" flexDirection="column">
    <Typography sx={{ fontWeight: 700, mb: 1 }}>On this page</Typography>
    {items?.map(({ title }) => (
      <Box sx={{ ml: 1 }} key={title}>
        <Title>{title}</Title>
      </Box>
    ))}
  </Box>
);
