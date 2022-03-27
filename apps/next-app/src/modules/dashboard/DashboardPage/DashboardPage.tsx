import React from 'react';
import { DefaultLayout } from 'src/modules/layout/DefaultLayout';
import { PageInformation } from '../PageInformation';
import { SideMenu } from '../SideMenu';

interface DashboardPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = () => (
  <DefaultLayout leftPanel={<SideMenu />} rightPanel={<PageInformation />}>
    DsashboardPage
  </DefaultLayout>
);
