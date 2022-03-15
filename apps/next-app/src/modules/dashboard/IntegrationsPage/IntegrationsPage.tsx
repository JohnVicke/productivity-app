import { Grid } from '@mui/material';
import React from 'react';
import { useThirdPartyIntegrations } from 'src/hooks/useThirdPartyIntegrations';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { MiddlePanelSection } from 'src/modules/layout/MiddlePanelSection';
import { ContinueWithButton } from 'src/pages/dashboard/integrations/ContinueWithButton';
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
          <ContinueWithButton
            text="Google"
            image={{ path: '/icons/google.svg', alt: 'google' }}
          />
        </Grid>
        <Grid item xs={12} md={1} minWidth="280px">
          <ContinueWithButton
            text="Slack"
            image={{ path: '/icons/slack.svg', alt: 'slack' }}
          />
        </Grid>
      </Grid>
    ),
  },
];

interface IntegrationsPageProps {}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = () => {
  const { data } = useThirdPartyIntegrations();
  console.log(data);
  return (
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
};
