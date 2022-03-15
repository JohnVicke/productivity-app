import React from 'react';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { PageInformation } from '../PageInformation';
import { SideMenu } from '../SideMenu/SideMenu';

const accordionActives = {
  activeAccordionKey: 'getting-started',
  activeAccordionItemKey: 'installation',
};

interface InstallationProps {}

export const InstallationPage: React.FC<InstallationProps> = () => (
  <DefaultLayout
    leftPanel={<SideMenu {...accordionActives} />}
    rightPanel={<PageInformation />}
  >
    InstallationPage
  </DefaultLayout>
);
