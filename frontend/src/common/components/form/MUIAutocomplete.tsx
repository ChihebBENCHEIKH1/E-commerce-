import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  control: any;
  errors?: any;
  options: { title: string; value: string }[];
  validationRules?: any;
  onChange?: (value: any) => void;
}

const MUIAutocomplete: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  options,
  validationRules = {},
  onChange,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option) => option.title}
          onChange={(_, value) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
            />
          )}
        />
      )}
    />
  );
};

export default MUIAutocomplete;
