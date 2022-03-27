import { useMutation, useQueryClient } from 'react-query';
import { Api } from 'src/lib/api';

const bulkUpdate = (ids: number[]) =>
  Api.put('api/todos/reschedule-today', { ids });

export const useRescheduleToday = () => {
  const queryClient = useQueryClient();

  return useMutation((ids: number[]) => bulkUpdate(ids), {
    onMutate: () => {
      queryClient.refetchQueries(['todayTodos', 'overdueTodos']);
    },
  });
};
