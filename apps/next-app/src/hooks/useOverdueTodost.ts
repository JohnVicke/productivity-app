import { useQuery } from 'react-query';
import { ITodo } from 'server/src/types/ITodo';
import { Api } from '../lib/api';

const fetchTodos = () => Api.get('api/todos/overdue');

export const useOverdueTodos = () =>
  useQuery<ITodo[], Error>('overdueTodos', fetchTodos, {
    staleTime: 60 * 1000,
  });
