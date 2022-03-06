import { useQuery } from 'react-query'
import { ITodo } from 'server/src/lib/ITodo'
import { Api } from '../lib/api'

const register = (provider: string) => Api.get(`auth/${provider}/register`)

export const useLogin = (provider: string, enabled?: boolean) =>
  useQuery<ITodo, Error>(['login'], () => register(provider), {
    enabled,
  })
