import { useQuery, UseQueryOptions } from 'react-query';
import { IUser } from 'server/src/types/IUser';
import { Api } from 'src/lib/api';

const fetchMe = () => Api.get('api/user/me');

export const useMe = ({ enabled }: UseQueryOptions) =>
  useQuery<IUser, Error>('me', fetchMe, { enabled });
