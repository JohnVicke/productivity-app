import { Add, ExpandMore, Schedule } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  styled,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useOverdueTodos } from 'src/hooks/useOverdueTodost';
import { useRescheduleToday } from 'src/hooks/useRescheduleToday';
import { useTodayTodos } from 'src/hooks/useTodayTodos';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { MiddlePanelSection } from 'src/modules/layout/MiddlePanelSection';
import { PageInformation } from '../PageInformation';
import { SideMenu } from '../SideMenu';
import { AddTodoModal } from './TodoModal';
import { Todo } from './Todo';

export const StyledAccordion = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    transition: '.2s ease-out',
  })
);

const accordionActives = {
  activeAccordionKey: 'today',
};

interface TodayPageProps {}

export const TodayPage: React.FC<TodayPageProps> = () => {
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  const { data: todos } = useTodayTodos();
  const { data: overdue } = useOverdueTodos();
  const { mutate } = useRescheduleToday();

  const rescheduleToday = () => {
    const ids = overdue?.map((todo) => todo.id);
    if (ids) mutate(ids);
  };

  const openTodoModal = () => {
    setAddTodoModalOpen(true);
  };

  const closeTodoModal = () => {
    setAddTodoModalOpen(false);
  };

  return (
    <DefaultLayout
      leftPanel={<SideMenu {...accordionActives} />}
      rightPanel={<PageInformation />}
    >
      <MiddlePanelSection title="Today">
        {!!overdue && overdue.length > 0 && (
          <StyledAccordion disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{ flexDirection: 'row-reverse' }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography sx={{ fontWeight: 700, ml: 2 }}>
                  Overdue |
                  <span
                    style={{ marginLeft: 10, fontWeight: 400, fontSize: 12 }}
                  >
                    {overdue.length} items
                  </span>
                </Typography>
                <Box display="flex" alignItems="center">
                  <Button startIcon={<Schedule />} onClick={rescheduleToday}>
                    <Typography sx={{ fontWeight: 700 }}>
                      Reschedule today
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {overdue?.map((todo) => (
                <Todo key={todo.id} title={todo.title} dueDate={todo.dueDate} />
              ))}
            </AccordionDetails>
          </StyledAccordion>
        )}

        {!!todos && todos.length > 0 && (
          <StyledAccordion
            disableGutters
            elevation={0}
            disabled={todos.length < 1}
            defaultExpanded={todos.length > 0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{ flexDirection: 'row-reverse' }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography sx={{ fontWeight: 700, ml: 2 }}>
                  Todo |
                  <span
                    style={{ fontSize: 12, marginLeft: 10, fontWeight: 400 }}
                  >
                    {todos.length} items
                  </span>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {todos?.map((todo) => (
                <Todo key={todo.id} title={todo.title} dueDate={todo.dueDate} />
              ))}
            </AccordionDetails>
          </StyledAccordion>
        )}

        <Button
          sx={{ float: 'right' }}
          variant="contained"
          onClick={openTodoModal}
          endIcon={<Add />}
        >
          Add todo
        </Button>
        <AddTodoModal open={addTodoModalOpen} handleClose={closeTodoModal} />
      </MiddlePanelSection>
    </DefaultLayout>
  );
};
