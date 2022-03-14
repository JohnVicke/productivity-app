import React from 'react';
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  useScrollTrigger,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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

export const TopNav: React.FC<TopNavProps> = () => (
  <>
    <ElevationScroll>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ouTo
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <TopNavOffset />
  </>
);
