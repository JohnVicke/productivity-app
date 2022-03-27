import { Grid } from '@mui/material';
import React from 'react';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { MiddlePanelSection } from 'src/modules/layout/MiddlePanelSection';
import { IntegrateWithButton } from 'src/pages/dashboard/integrations/IntegrateWIthButton';
import { IMiddlePanelSection } from 'src/types/LayoutTypes';
import { PageInformation } from '../PageInformation';
import { SideMenu } from '../SideMenu';

const accordionActives = {
  activeAccordionKey: 'integrations',
};

const pageInformation: IMiddlePanelSection[] = [
  {
    title: 'Integrations',
    body: 'View or setup new integrations with your favoriute collaboration or communication tools. Integrated tools can be used in routines and automations.',
    content: (
      <Grid container columns={3} spacing={2}>
        <Grid item xs={12} md={1} minWidth="280px">
          <IntegrateWithButton
            text="Google"
            image={{ path: '/icons/google.svg', alt: 'google' }}
          />
        </Grid>
        <Grid item xs={12} md={1} minWidth="280px">
          <IntegrateWithButton
            text="Slack"
            image={{ path: '/icons/slack.svg', alt: 'slack' }}
          />
        </Grid>
      </Grid>
    ),
  },
];

interface IntegrationsPageProps {}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = () => (
  <DefaultLayout
    leftPanel={<SideMenu {...accordionActives} />}
    rightPanel={
      <PageInformation
        items={pageInformation.map(({ body, title }) => ({ title, body }))}
      />
    }
  >
    {pageInformation.map(({ content, ...rest }) => (
      <MiddlePanelSection {...rest} key={rest.title}>
        {content}
      </MiddlePanelSection>
    ))}
  </DefaultLayout>
);
