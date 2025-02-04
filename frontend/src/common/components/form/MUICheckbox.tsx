import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  validationRules?: any;
}

const MUICheckbox: React.FC<Props> = ({
  label,
  name,
  register,
  validationRules = { required: `${label} is required` },
}) => (
  <FormControlLabel
    control={<Checkbox {...register(name, validationRules)} />}
    label={label}
  />
);

export default MUICheckbox;
