import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  AccordionDetails,
  AccordionDetailsProps,
} from '@mui/material';
import styled from 'styled-components';

export const StyledAccordion = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    transition: '.2s ease-out',
  })
);

export const StyledAccordionSummary = styled(AccordionSummary)<
  AccordionSummaryProps & { active: boolean }
>(({ theme, active }) => ({
  borderRadius: 5,
  backgroundColor: `${
    active ? theme.palette.primary.light : theme.palette.background.default
  }`,
  margin: '5px 0',
  transition: '.2s ease-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const StyledAccordionDetails = styled(
  AccordionDetails
)<AccordionDetailsProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: 0,
}));
