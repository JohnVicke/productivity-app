import React from 'react';
import {
  Typography,
  Toolbar,
  AppBar,
  useScrollTrigger,
  styled,
  Box,
  Container,
} from '@mui/material';
import { Dashboard, School, Work, AccountCircle } from '@mui/icons-material';
import Link from 'next/link';
import { useMe } from 'src/hooks/useMe';
import { useScreenType } from 'src/hooks/useScreenType';
import { TopNavItem } from './TopNavItem';

const navItems = [
  {
    href: '/features',
    title: 'Features',
    IconComponent: School,
  },
  {
    href: '/resources',
    title: 'Resources',
    IconComponent: Work,
    dropdown: true,
  },
];

const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const TopNavOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = () => {
  const { data, isLoading } = useMe({ enabled: true });
  const screenType = useScreenType();

  const isCompactNav = screenType !== '3-cols' && screenType !== '2-cols';

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <Container maxWidth="xl">
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" flexGrow={1}>
                  <Link passHref href="/">
                    <Typography
                      sx={{
                        mr: 6,
                        cursor: 'pointer',
                        width: `${isCompactNav ? '100%' : 'auto'}`,
                      }}
                      variant="h4"
                    >
                      ouTo
                    </Typography>
                  </Link>
                  {navItems.map((item) => (
                    <Box sx={{ mr: 4 }} key={item.title}>
                      <TopNavItem {...item} displayText={!isCompactNav} />
                    </Box>
                  ))}
                </Box>
                {!isLoading && !data ? (
                  <Box display="flex">
                    <Link href="/login" passHref>
                      <Typography sx={{ mr: 2 }} variant="body1">
                        Login
                      </Typography>
                    </Link>
                    <Typography variant="body1">Sign Up</Typography>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Box sx={{ mr: 4 }}>
                      <TopNavItem
                        href="/dashboard"
                        title="Dashboard"
                        IconComponent={Dashboard}
                        displayText={!isCompactNav}
                      />
                    </Box>
                    <TopNavItem
                      href="/profile"
                      title="Profile"
                      IconComponent={AccountCircle}
                      displayText={!isCompactNav}
                    />
                  </Box>
                )}
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <TopNavOffset />
    </>
  );
};
