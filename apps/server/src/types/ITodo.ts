export interface ITodo {
  id: number;
  title: string;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateTodoParams {
  title: string;
  dueDate: Date;
}
