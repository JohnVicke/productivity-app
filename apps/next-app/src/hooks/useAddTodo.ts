import { useMutation, useQueryClient } from 'react-query';
import { ICreateTodoParams, ITodo } from 'server/src/types/ITodo';
import { useToastStore } from 'src/modules/toast/useToastStore';
import { Api } from '../lib/api';

interface OuToContext {
  previousTodos?: ITodo[];
}

const addTodo = (todo: ICreateTodoParams) => Api.post('api/todos', todo);

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation<ITodo, Error, ICreateTodoParams, OuToContext>(
    (todo: ICreateTodoParams) => addTodo(todo),
    {
      onMutate: async (newTodo: ICreateTodoParams) => {
        await queryClient.cancelQueries('todos');
        const previousTodos = queryClient.getQueryData<ITodo[]>('todos');
        if (previousTodos) {
          queryClient.setQueryData<ITodo[]>('todos', [
            ...previousTodos,
            newTodo,
          ]);
        }
        return { previousTodos };
      },
      onError: (err, newTodo, context) => {
        if (err) {
          showToast({
            message: 'Oops something went wrong',
            open: true,
            severity: 'error',
          });
        }
        if (context?.previousTodos) {
          queryClient.setQueryData<ITodo[]>('todos', context.previousTodos);
        }
      },

      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  );
};
