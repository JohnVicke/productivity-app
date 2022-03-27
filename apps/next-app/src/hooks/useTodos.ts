import { useQuery } from 'react-query';
import { ITodo } from 'server/src/types/ITodo';
import { Api } from '../lib/api';

const fetchTodos = () => Api.get('api/todos');

export const useTodos = () =>
  useQuery<ITodo[], Error>('todos', fetchTodos, {
    staleTime: 60 * 1000,
  });
