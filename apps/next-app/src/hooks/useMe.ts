import { useQuery, UseQueryOptions } from 'react-query';
import { IUser } from 'server/src/lib/IUser';
import { Api } from 'src/lib/api';

const fetchMe = () => Api.get('api/user/me');

export const useMe = ({ enabled }: UseQueryOptions) =>
  useQuery<IUser, Error>('me', fetchMe, { enabled });
