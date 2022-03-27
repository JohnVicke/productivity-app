import React from 'react';
import { DefaultLayout } from '../layout/DefaultLayout';
import { PageInformation } from './PageInformation';
import { SideMenu } from './SideMenu';

interface DashboardProps {
  content: React.ReactElement;
}

export const Dashboard: React.FC<DashboardProps> = ({ content }) => (
  <DefaultLayout leftPanel={<SideMenu />} rightPanel={<PageInformation />}>
    {content}
  </DefaultLayout>
);
