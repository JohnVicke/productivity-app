import { Box } from '@mui/material';
import React from 'react';
import { SideMenuItem } from './SideMenuItem';
import { ISideMenuItem, SubItem } from './types';

const installation: SubItem = {
  installation: {
    title: 'Installation',
    href: 'getting-started/installation',
  },
};

const gettingStarted: ISideMenuItem = {
  'getting-started': {
    title: 'Getting Started',
    subItems: [installation],
  },
};

const integrations: ISideMenuItem = {
  integrations: {
    title: 'Integrations',
    href: 'dashboard/integrations',
  },
};

const sideMenuItems: ISideMenuItem[] = [gettingStarted, integrations];

interface SideMenuProps {
  activeAccordionKey?: string;
  activeAccordionItemKey?: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, ...props }) => (
  <Box paddingTop={10}>
    {sideMenuItems.map((m) => (
      <Box key={Object.keys(m)[0]}>
        <SideMenuItem menuItem={m} {...props} />
      </Box>
    ))}
  </Box>
);
