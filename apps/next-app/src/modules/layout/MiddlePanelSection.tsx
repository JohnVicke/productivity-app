import { Box, Typography } from '@mui/material';
import React from 'react';

interface MiddlePanelSectionProps {
  title: string;
  body?: string;
  children?: React.ReactNode;
}

export const MiddlePanelSection: React.FC<MiddlePanelSectionProps> = ({
  title,
  body,
  children,
}) => (
  <>
    <Box marginBottom={4}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1">{body}</Typography>
    </Box>
    {children}
  </>
);
