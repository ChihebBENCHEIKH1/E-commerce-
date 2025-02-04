import React from "react";
import { TextField } from "@mui/material";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors?: any;
  validationRules?: any;
}

const MUIInput: React.FC<Props> = ({
  label,
  name,
  register,
  errors,
  validationRules = {},
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      {...register(name, validationRules)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
    />
  );
};

export default MUIInput;
