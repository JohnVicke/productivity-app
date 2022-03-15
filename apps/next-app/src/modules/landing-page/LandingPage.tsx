import React from 'react';
import {
  Box,
  Container,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  BoxProps,
} from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { LinkButton } from 'src/components/LinkButton';
import { TopNav } from '../nav/TopNav';

const ImageBox = styled(Box)<BoxProps>(({ theme }) => ({
  minWidth: '2000px',
  minHeight: '1000px',
  backgroundColor: theme.palette.primary.dark,
  overflowX: 'hidden',
}));

interface LandingPageProps {}

export const LandingPage: NextPage<LandingPageProps> = () => {
  const { t } = useTranslation('common', { keyPrefix: 'landing-page' });
  const showRightPanel = useMediaQuery('(min-width:900px)');

  return (
    <Box maxWidth="100%" overflow="hidden">
      <TopNav />
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="1000px"
          spacing={4}
        >
          <Grid item style={{ textAlign: 'left' }} md={7} lg={6}>
            <Typography variant="h3">{t('header.title')}</Typography>
            <Typography variant="body1" sx={{ marginY: 2 }}>
              {t('header.body')}
            </Typography>
            <LinkButton variant="contained" href="/login">
              {t('header.cta-button')}
            </LinkButton>
          </Grid>
          {showRightPanel && (
            <Grid item md={5} lg={6}>
              <ImageBox>
                <Typography>HELLO WORLD</Typography>
              </ImageBox>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
