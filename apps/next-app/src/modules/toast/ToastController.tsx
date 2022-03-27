import React from 'react';
import { Toast } from './Toast';
import { useToastStore } from './useToastStore';

interface ErrorToastControllerProps {}

export const ToastController: React.FC<ErrorToastControllerProps> = () => {
  const { toasts, hideToast } = useToastStore();

  return (
    <>
      {toasts.map((t) => (
        <Toast
          severity={t.severity}
          key={t.id}
          message={t.message}
          action={t.action}
          handleClose={() => hideToast(t.id)}
          open={t.open}
        />
      ))}
    </>
  );
};
