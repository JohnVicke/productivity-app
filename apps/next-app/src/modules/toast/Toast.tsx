import React from 'react';
import { Alert, Snackbar, useTheme, AlertColor } from '@mui/material';

interface ToastProps {
  action: React.ReactNode;
  handleClose: () => void;
  message: string;
  open: boolean;
  severity?: AlertColor;
}

export const Toast: React.FC<ToastProps> = ({
  action,
  open,
  handleClose,
  message,
  severity = 'success',
}) => {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={open}
      color={theme.palette.background.default}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
