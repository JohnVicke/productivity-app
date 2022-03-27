import React, { useMemo } from 'react';
import { Container, Grid, styled, GridProps, Box } from '@mui/material';
import { useScreenType } from 'src/hooks/useScreenType';
import { TopNav } from '../nav/TopNav';

const LeftPanelContainer = styled(Box)<GridProps>(() => ({
  maxWidth: 275,
  width: '100%',
  position: 'fixed',
}));

const RightPanelContainer = styled(Box)<GridProps>(() => ({
  maxWidth: 240,
  width: '100%',
  position: 'fixed',
}));

interface DefaultLayoutProps {
  children: React.ReactNode;
  leftPanel?: React.ReactElement;
  rightPanel?: React.ReactElement;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  leftPanel,
  rightPanel,
}) => {
  const screenType = useScreenType();

  const displayRight = useMemo(
    () => screenType === '2-cols' || screenType === '3-cols',
    [screenType]
  );

  const displayLeft = useMemo(() => screenType === '3-cols', [screenType]);

  return (
    <>
      <TopNav />
      <Container maxWidth="xl">
        <Grid container columns={8}>
          {displayLeft && (
            <Grid item xs="auto" minWidth={275}>
              <LeftPanelContainer>{leftPanel}</LeftPanelContainer>
            </Grid>
          )}
          <Grid
            item
            xs
            paddingTop={12}
            marginX={screenType === '3-cols' ? 8 : 2}
          >
            {children}
          </Grid>
          {displayRight && (
            <Grid item xs="auto" minWidth={240} paddingTop={12}>
              <RightPanelContainer>{rightPanel}</RightPanelContainer>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
