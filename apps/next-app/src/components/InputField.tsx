import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  control: Control<any, any>;
  rules?: Object;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  control,
  rules,
}) => (
  <Controller
    rules={rules}
    name={name}
    control={control}
    render={({ field, fieldState: { invalid } }) => (
      <TextField
        {...field}
        error={invalid}
        autoFocus
        margin="dense"
        label={label}
        fullWidth
        variant="outlined"
        helperText={invalid && 'Required'}
        sx={{ mb: 4 }}
      />
    )}
  />
);
