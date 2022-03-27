import { useQuery } from 'react-query';
import { ITodo } from 'server/src/types/ITodo';
import { Api } from '../lib/api';

const fetchTodos = () => Api.get('api/todos/today');

export const useTodayTodos = () =>
  useQuery<ITodo[], Error>('todayTodos', fetchTodos, {
    staleTime: 60 * 1000,
    retry: false,
  });
