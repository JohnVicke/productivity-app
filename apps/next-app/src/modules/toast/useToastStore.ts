import React from 'react';
import create from 'zustand';
import { v4 } from 'uuid';
import { combine } from 'zustand/middleware';
import { AlertColor } from '@mui/material';

type Toast = {
  id: string;
  open: boolean;
  message: string;
  action?: React.ReactNode;
  severity?: AlertColor;
};

export const useToastStore = create(
  combine(
    {
      toasts: [] as Toast[],
    },
    (set) => ({
      hideToast: (id: string) =>
        set((x) => ({ toasts: x.toasts.filter((y) => y.id !== id) })),
      showToast: (t: Omit<Toast, 'id'>) =>
        set((x) => {
          const currentRemovedToasts: Toast[] = x.toasts.filter(
            (y) => y.message !== t.message
          );
          return {
            toasts: [...currentRemovedToasts, { ...t, id: v4() }],
          };
        }),
    })
  )
);
