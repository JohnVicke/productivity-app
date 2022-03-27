import { useQuery, useQueryClient } from 'react-query';
import { ITodo } from 'server/src/types/ITodo';
import { Api } from '../lib/api';

const fetchWorkout = (id: number) => Api.get(`api/todos/${id}`);

export const useTodo = (id: number, enabled?: boolean) => {
  const queryClient = useQueryClient();
  const todos = queryClient.getQueryData<ITodo[]>('todos');
  const initialData = todos?.find((todo) => todo.id === id);

  return useQuery<ITodo, Error>(['todo', id], () => fetchWorkout(id), {
    initialData,
    enabled,
  });
};
