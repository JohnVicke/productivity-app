import React, { useMemo } from 'react';
import { Container, Grid, styled, GridProps, Box } from '@mui/material';
import { useScreenType } from 'src/hooks/useScreenType';

const LeftPanel = styled(Box)<GridProps>(({ theme }) => ({
  maxWidth: 275,
  width: '100%',
  position: 'fixed',
}));

const RightPanel = styled(Box)<GridProps>(({ theme }) => ({
  maxWidth: 240,
  width: '100%',
  position: 'fixed',
}));

interface DefaultLayoutProps {
  children: React.ReactChild;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const screenType = useScreenType();

  const displayRight = useMemo(
    () => screenType === '2-cols' || screenType === '3-cols',
    [screenType]
  );

  const displayLeft = useMemo(() => screenType === '3-cols', [screenType]);

  return (
    <Container maxWidth="xl">
      <Grid container columns={8}>
        {displayLeft && (
          <Grid item xs="auto" minWidth={275}>
            <LeftPanel>Left panel</LeftPanel>
          </Grid>
        )}
        <Grid item xs>
          {children}
        </Grid>
        {displayRight && (
          <Grid item xs="auto" minWidth={240}>
            <RightPanel>
              <h1>Right Panel</h1>
            </RightPanel>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
