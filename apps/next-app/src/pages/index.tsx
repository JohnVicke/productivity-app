import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LandingPage } from 'src/modules/landing-page/LandingPage';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default LandingPage;
