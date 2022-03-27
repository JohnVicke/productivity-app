import { Inbox } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import React from 'react';
import { SideMenuAccordion } from './SideMenuAccordion';
import { ISideMenuItem, SubItem } from './types';

const installation: SubItem = {
  installation: {
    title: 'Installation',
    href: '/dashboard/getting-started/installation',
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
    href: '/dashboard/integrations',
  },
};

const bottomItems: ISideMenuItem[] = [gettingStarted, integrations];

const inbox: ISideMenuItem = {
  inbox: {
    title: 'Inbox',
    href: '/dashboard/inbox',
    icon: <Inbox width={30} height={30} />,
  },
};

const today: ISideMenuItem = {
  today: {
    title: 'Today',
    href: '/dashboard/today',
  },
};

const topItems: ISideMenuItem[] = [inbox, today];

interface SideMenuProps {
  activeAccordionKey?: string;
  activeAccordionItemKey?: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, ...props }) => (
  <Box paddingTop={10}>
    {topItems.map((item) => (
      <Box key={Object.keys(item)[0]}>
        <SideMenuAccordion menuItem={item} {...props} />
      </Box>
    ))}
    <Divider sx={{ my: 2 }} />
    {bottomItems.map((item) => (
      <Box key={Object.keys(item)[0]}>
        <SideMenuAccordion menuItem={item} {...props} />
      </Box>
    ))}
  </Box>
);
