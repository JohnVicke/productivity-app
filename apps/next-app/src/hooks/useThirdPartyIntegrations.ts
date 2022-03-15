import { useQuery } from 'react-query';
import { Api } from 'src/lib/api';

const fetchThirdPartIntegrations = () =>
  Api.get('api/user/third-party-integrations');

export const useThirdPartyIntegrations = () =>
  useQuery('third-party-integrations', fetchThirdPartIntegrations);
