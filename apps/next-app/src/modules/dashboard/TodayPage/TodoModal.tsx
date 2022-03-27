import { DateTimePicker } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICreateTodoParams } from 'server/src/types/ITodo';
import { InputField } from 'src/components/InputField';
import { useAddTodo } from 'src/hooks/useAddTodo';

interface AddTodoModalProps {
  open: boolean;
  edit?: boolean;
  handleClose: () => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open,
  handleClose,
}) => {
  const { control, handleSubmit, formState } = useForm<ICreateTodoParams>({
    defaultValues: { dueDate: new Date() },
  });
  const { mutate } = useAddTodo();

  const onSubmit: SubmitHandler<ICreateTodoParams> = (data) => {
    mutate({ ...data });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            rules={{ required: true }}
            name="title"
            control={control}
            label="Title"
          />
          <Controller
            rules={{ required: true }}
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Due date"
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!formState.isDirty || formState.isValidating}
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
