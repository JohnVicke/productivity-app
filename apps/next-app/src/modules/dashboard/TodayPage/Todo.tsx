import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  PaperProps,
  styled,
} from '@mui/material';
import React from 'react';
import { getDisplayDate } from 'src/utils/dateUtils';

const Root = styled(Paper)<PaperProps>(() => ({
  padding: 4,
  marginBottom: 4,
  display: 'flex',
  justifyContent: 'space-between',
}));

interface TodoProps {
  title: string;
  dueDate?: Date;
}

const TodoControls: React.FC = () => (
  <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
    <IconButton>
      <Edit />
    </IconButton>
    <IconButton>
      <Delete />
    </IconButton>
  </Box>
);

export const Todo: React.FC<TodoProps> = ({ title, dueDate }) => (
  <Root>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <Checkbox />
        {title}
      </Box>
      <Box sx={{ mr: 2, fontSize: 14 }}>
        {dueDate && getDisplayDate(dueDate.toString())}
      </Box>
    </Box>
    <TodoControls />
  </Root>
);
