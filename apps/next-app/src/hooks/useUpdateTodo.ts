import { useMutation } from 'react-query';
import { ICreateTodoParams, ITodo } from 'server/src/types/ITodo';
import { Api } from '../lib/api';

interface OuToContext {
  previousTodo?: ITodo;
}

const updateTodo = (todo: ICreateTodoParams) => Api.put('api/todos', todo);

export const useUpdateTodo = () =>
  useMutation<ITodo, Error, ICreateTodoParams, OuToContext>(
    (todo: ICreateTodoParams) => updateTodo(todo)
  );
