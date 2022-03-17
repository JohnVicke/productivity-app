import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { MiddlePanelSection } from 'src/modules/layout/MiddlePanelSection';
import { ITodo } from 'server/src/lib/ITodo';
import { PageInformation } from '../PageInformation';
import { SideMenu } from '../SideMenu';

const accordionActives = {
  activeAccordionKey: 'today',
};

interface TodayPageProps {}

export const TodayPage: React.FC<TodayPageProps> = ({}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return (
    <DefaultLayout
      leftPanel={<SideMenu {...accordionActives} />}
      rightPanel={<PageInformation />}
    >
      <MiddlePanelSection title="Today">
        <TextField
          label="Task"
          variant="filled"
          helperText="What is your plan for today?"
          fullWidth
        />
        {todos?.map((todo) => (
          <Typography key={todo.title}>{todo.title}</Typography>
        ))}
      </MiddlePanelSection>
    </DefaultLayout>
  );
};
